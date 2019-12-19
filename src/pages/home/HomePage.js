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
  const [openAutoComplete, setOpenAutoComplete] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const [inputForm, setInputForm] = React.useState(null)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    if(result == null){
      fetch('http://api.harmony.choisy.io/all')
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
      const response = await fetch('http://api.harmony.choisy.io/listcontainers');
      const containers = await response.json();
      
      if (active) {
        var list = []
        containers.forEach(function(item){
          list.push(item)
          console.log(list)
        })
        setOptions(list);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);
  
  useEffect(() => {
    if (!openAutoComplete) {
      setOptions([]);
    }
  }, [openAutoComplete]);
  
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
        <Grid container spacing={4}>
            {result.map((item) => {
                for (let [key, value] of Object.entries(item.NetworkSettings.Networks)) {
                  return(<Grid item xs={12} sm={6} md={4} lg={'auto'}><CardDocker key={item.Id} name={item.Names} address={value.IPAddress} /></Grid>)
                }
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
                    open={openAutoComplete}
                    onOpen={() => {
                      setOpenAutoComplete(true);
                    }}
                    onClose={() => {
                      setOpenAutoComplete(false);
                    }}
                    getOptionSelected={(option, value) => option === value}
                    getOptionLabel={option => {
                      setInputForm(option)
                      return(option.nom)
                    }}
                    options={options}
                    loading={loading}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Asynchronous"
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
                <div style={{paddingTop: 10}}>
                  <TextField
                    label="Nom"
                    variant="outlined"
                    size="small"
                    value={inputForm != null ? inputForm.nom :  ""}
                  />
                </div>
                <div style={{paddingTop: 10}}>
                  <TextField
                    label="Adresse:port ou domaine"
                    variant="outlined"
                    size="small"
                    value={inputForm != null ? "http://" + inputForm.adresse :  ""}
                    />
                </div>
                <div  style={{paddingTop: 10}}>
                  <input
                    id="imageCard"
                    label="Image"
                    type="file"
                    size="small"
                  />
                </div>
              </div>
            </Modal>
          </Grid>
        </Grid>
      </div>
    )
  }
}
