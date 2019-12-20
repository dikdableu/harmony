import React, { useState, useEffect } from 'react';
import CardDocker from './CardDocker/CardDocker';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '0px solid #fff',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function HomePage () {
  
  const classes = useStyles();
  
  const [result, setResult] = useState(null)
  const [open, setOpen] = React.useState(false);
  const [openAutoCompleteContainer, setOpenAutoCompleteContainer] = React.useState(false);
  const [openAutoCompleteGroupe, setOpenAutoCompleteGroupe] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [optionsGroupe, setOptionsGroupe] = React.useState([]);
  const loading = openAutoCompleteContainer && options.length === 0;
  const loadingGroupe = openAutoCompleteGroupe && optionsGroupe.length === 0;
  const [inputForm, setInputForm] = React.useState(null)
  const [inputGroupe, setInputGroupe] = React.useState(null)
  const [selectedFile, setSelectedFile] = React.useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const onChangeHandler=event=>{
    setSelectedFile(event.target.files[0])
}
  
  const submitFrom = () => {
    
    var data = new FormData()
    
    var idCard =  document.getElementById("idCard").value;
    var nomCard = document.getElementById("nomCard").value;
    var adresseCard = document.getElementById("adresseCard").value;
    var imageCard = selectedFile;
    var groupeCard = document.getElementById("groupeCard").value;
    
    data.append( "idCard", idCard)
    data.append( "nomCard", nomCard)
    data.append( "adresseCard", adresseCard)
    data.append( "imageCard", imageCard)
    data.append( "groupeCard", groupeCard)
    
    console.log(imageCard)
     fetch('http://api.harmony.choisy.io/addForm', {
      method: "POST",
      body: data,
    });
  };
  
  useEffect(() => {
    if(result == null){
      fetch('http://api.harmony.choisy.io/listcontainers')//a changer par listcontainers
      .then(response => response.json())
      .then(data => setResult(data));
    }
  }, [result]);
  
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://api.harmony.choisy.io/all');
      const containers = await response.json();
      
      if (active) {
        var list = []
        containers.map((item) => {
          list.push(item)
        })
        console.log(containers)
        setOptions(list);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  
  useEffect(() => {
    let active = true;

    if (!loadingGroupe) {
      return undefined;
    }

    (async () => {
      const response = await fetch('http://api.harmony.choisy.io/listgroupes');
      const groupes = await response.json();
      
      if (active) {
        var listGroupe = []
        groupes.map((item) => {
          
          listGroupe.push(item)
          console.log(item)
        })
        setOptionsGroupe(listGroupe);
      }
    })();

    return () => {
      active = false;
    };
  }, [loadingGroupe]);
  
  useEffect(() => {
    if (!openAutoCompleteContainer) {
      setOptions([]);
    }
  }, [openAutoCompleteContainer]);
  
  useEffect(() => {
    if (!openAutoCompleteGroupe) {
      setOptionsGroupe([]);
    }
  }, [openAutoCompleteGroupe]);
  
  if(result == null){
    return (<Grid justify="center" container ><Loader
         type="TailSpin"
         color="#3f51b5"
         height={100}
         width={100}
      /></Grid>)

    return (<Grid justify="center" container ><Loader
         type="TailSpin"
         color="#3f51b5"
         height={100}
         width={100}
      /></Grid>)

  }else{
    return (
      <div>
      {console.log(result)}
        <Grid container spacing={4}>
            {result.map((item) => {
                console.log(item.adresse)
                return(<Grid item xs={12} sm={6} md={4} lg={'auto'}><CardDocker key={item.id} nom={item.nom} adresse={item.adresse} image={item.image}/></Grid>)
              })
            }
          <Grid 
          item 
          xs={12} 
          sm={6} 
          md={4} 
          lg={3} 
          container
          direction="column"
          alignItems="center" 
          justify="center"
          
          >
            <Fab onClick={handleOpen} style={{borderRadius:90, width: 160, height:160, borderWidth: 0, boxShadow: 3 }} elevation={8}>
              <AddIcon style={{ fontSize: 40,  color: '#777777' }} />
            </Fab>
            <Modal
              open={open}
              onClose={handleClose}
              style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}
            >
              <div className={classes.paper}>
                <div style={{paddingTop: 5}}>
                  <Autocomplete
                    id="asynchronous-demo"
                    style={{flex:1}}
                    open={openAutoCompleteContainer}
                    onOpen={() => {
                      setOpenAutoCompleteContainer(true);
                    }}
                    onClose={() => {
                      setOpenAutoCompleteContainer(false);
                    }}
                    getOptionSelected={(option, value) => option === value}
                    getOptionLabel={option => {
                      setInputForm(option)
                      return(option.Names)
                    }}
                    options={options}
                    loading={loading}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Liste des containers"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loading ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{display: 'none'}}>
                  <TextField
                    label="Id"
                    id="idCard"
                    variant="outlined"
                    fullWidth
                    required
                    value={inputForm != null ? inputForm.Id :  ""}
                  />
                </div>
                <div style={{paddingTop: 10}}>
                  <TextField
                    id="nomCard"
                    label="Nom"
                    variant="outlined"
                    fullWidth
                    required
                    value={inputForm != null ? inputForm.Names :  ""}
                  />
                </div>
                <div style={{paddingTop: 10}}>
                  <TextField
                    id="adresseCard"
                    label="Adresse:port ou domaine"
                    variant="outlined"
                    fullWidth
                    required
                    />
                </div>
                <div  style={{paddingTop: 10}}>
                  <input
                    id="imageCard"
                    label="Image"
                    type="file"
                    size="small"
                    onChange={onChangeHandler}
                  />
                </div>
                <div style={{paddingTop: 10}}>
                  <Autocomplete
                    id="asynchronous-groupe"
                    style={{flex:1}}
                    open={openAutoCompleteGroupe}
                    onOpen={() => {
                      setOpenAutoCompleteGroupe(true);
                    }}
                    onClose={() => {
                      setOpenAutoCompleteGroupe(false);
                    }}
                    getOptionSelected={(optionsGroupe, value) => optionsGroupe === value}
                    getOptionLabel={optionsGroupe => {
                      setInputGroupe(optionsGroupe)
                      return(optionsGroupe.nom)
                    }}
                    options={optionsGroupe}
                    loading={loadingGroupe}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Liste des groupes"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          endAdornment: (
                            <React.Fragment>
                              {loadingGroupe ? <CircularProgress color="inherit" size={20} /> : null}
                              {params.InputProps.endAdornment}
                            </React.Fragment>
                          ),
                        }}
                      />
                    )}
                  />
                </div>
                <div style={{display: 'none'}}>
                  <TextField
                    label="groupeCard"
                    id="groupeCard"
                    variant="outlined"
                    fullWidth
                    required
                    value={inputGroupe != null ? inputGroupe.id :  ""}
                  />
                </div>
                <div  style={{paddingTop: 10}}>
                  <Button variant="contained" onClick={() => submitFrom()}>Soumettre</Button>
                </div>
              </div>
            </Modal>
          </Grid>
        </Grid>
      </div>
    )
  }
}
