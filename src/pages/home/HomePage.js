import React, { useState, useEffect } from 'react';
import CardDocker from './CardDocker/CardDocker';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
import Fab from '@material-ui/core/Fab';


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
  
  if(result == null){
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
                <h2>Text in a modal</h2>
                <p>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </p>
                <Modal />
              </div>
            </Modal>
          </Grid>
        </Grid>
      </div>
    )
  }
}
