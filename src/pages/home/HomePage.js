import React from 'react';
import CardDocker from './CardDocker/CardDocker';
import Grid from '@material-ui/core/Grid';

export default function HomePage (){

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <CardDocker/>
        </Grid>
      </Grid>
    </div>
  )
}
