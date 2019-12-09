import React, { useState, useEffect } from 'react';
import CardDocker from './CardDocker/CardDocker';
import Grid from '@material-ui/core/Grid';
import Loader from 'react-loader-spinner'

export default function HomePage () {
  
  const [result, setResult] = useState(null)
  
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
                  return(<Grid item xs={12} sm={6} md={4} lg={3}><CardDocker key={item.Id} name={item.Names} address={value.IPAddress} /></Grid>)
                }
              })
            }
        </Grid>
      </div>
    )
  }
}
