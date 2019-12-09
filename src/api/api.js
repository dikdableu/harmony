const Sequelize = require('sequelize');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
var express = require('express');
var port = 4000;

var app = express();

var myRouter = express.Router();



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
  }
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

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Je vous rappelle notre route (/piscines).
myRouter.route('/listcontainers')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
    var resultat = [];
    var container;
    sequelize.query("Select idContainer from users inner join groupeusers on users.id = groupeusers.idUser inner join groupecontainers on groupecontainers.idGroupe = groupeusers.idGroupe where login='bastien';").then(([results, metadata]) => {
      results.forEach(function(element, index){
        resultat.push(element.idContainer)
      })
       docker.listContainers({"filters": {"id": resultat}}, function(err, containers) {
          console.log(containers)
          res.json(containers);
        })
    })
})

myRouter.route('/all')
// J'implémente les méthodes GET, PUT, UPDATE et DELETE
// GET
.get(function(req,res){
  var container;
  docker.listContainers({"all": true}, function(err, containers) {
    console.log(containers)
    res.json(containers);
  })
})

//POST
//.post(function(req,res){
//       res.json({message : "Ajoute une nouvelle piscine à la liste", methode : req.method});
// })
//PUT
// .put(function(req,res){
//       res.json({message : "Mise à jour des informations d'une piscine dans la liste", methode : req.method});
// })
//DELETE
// .delete(function(req,res){
// res.json({message : "Suppression d'une piscine dans la liste", methode : req.method});
// });

// Nous demandons à l'application d'utiliser notre routeur
app.use(myRouter);


app.listen(port, function(){
	console.log("Mon serveur fonctionne sur http://localhost:"+port+"\n");
});