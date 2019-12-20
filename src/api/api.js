const Sequelize = require('sequelize');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var express = require('express');
var app = express();
const fs = require('fs');
var cors = require('cors');
var port = 4000;
var bodyParser = require('body-parser');
const formidable = require('express-formidable');

app.use(formidable());


// Option 1: Passing parameters separately
const sequelize = new Sequelize('Harmony', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('user', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // options
});

const Groupe = sequelize.define('groupe', {
  // attributes
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  nom: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  // options
});

const Container = sequelize.define('container', {
  // attributes
  id: {
    type: Sequelize.STRING(2000) ,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
		type: Sequelize.BLOB('long')
	},
	adresse: {
    type: Sequelize.STRING(2000)
  },
}, {
  // options
});

const GroupeUser = sequelize.define('groupeuser', {
  // attributes
  idUser: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: User,

     // This is the column name of the referenced model
     key: 'id'
   }
 },
 idGroupe: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Groupe,

     // This is the column name of the referenced model
     key: 'id'
   }
 },
}, {
  // options
});

const GroupeContainer = sequelize.define('groupecontainer', {
  // attributes
  idContainer: {
   type: Sequelize.STRING(2000),

   references: {
     // This is a reference to another model
     model: Container,

     // This is the column name of the referenced model
     key: 'id'
   }
 },
 idGroupe: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Groupe,

     // This is the column name of the referenced model
     key: 'id'
   }
 },
}, {
  // options
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    /*sequelize.sync({
      force: true,
    }) */
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/listcontainers', function(req,res){
    var resultat = [];
    var container;
    sequelize.query("Select c.id,c.nom,c.image,c.adresse from users u inner join groupeusers on u.id = groupeusers.idUser inner join groupecontainers on groupecontainers.idGroupe = groupeusers.idGroupe inner join containers c on c.id = groupecontainers.idContainer where login='bastien';").then(([results, metadata]) => {
      res.json(results)
    })
})

app.get('/all', function(req,res){
  var container;
  docker.listContainers({"all": true}, function(err, containers) {
    res.json(containers);
  })
})

app.get('/listgroupes', function(req,res){
    var resultat = [];
    var container;
    sequelize.query("Select id, nom from groupes;").then(([results, metadata]) => {
      res.json(results)
    })
})


app.post('/addForm', function(req,res){
  
  console.log(req)
  
  var idCard = req.fields.idCard
  var nomCard = req.fields.nomCard
  var adresseCard = req.fields.adresseCard
  var groupeCard = req.fields.groupeCard
  
  var imageCardName = req.files.imageCard.name
  fs.writeFile('../../public/'+imageCardName, new Buffer(req.files, "base64"), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  sequelize.query("insert into containers values('" +  idCard + "', '" + nomCard + "', './" + imageCardName + "', '" + adresseCard + "', now(), now());").then(([results, metadata]) => {
    
  })
  sequelize.query("insert into groupecontainers values(NULL, '" +  idCard + "', " + groupeCard + ", now(), now());").then(([results, metadata]) => {
    
  })
  res.send('ok')
})


app.listen(port, function(){
	console.log("Mon serveur fonctionne sur http://localhost:"+port+"\n");
});
