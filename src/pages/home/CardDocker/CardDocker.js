import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardDocker(){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
    console.log(anchorEl)
  };

  return(
    <Card className={classes.card} elevation={8}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://raw.githubusercontent.com/filebrowser/logo/master/banner.png"
          title="filebrowser"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            filebrowser
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Est un outils qui permet d'administrer ses fichiers dans le cloud
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
        <Fab size="small" variant="extended" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ marginLeft: "auto" }}>
          <MoreVertIcon/>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => handleClose}>Ouvrir</MenuItem>
              <MenuItem onClick={() => handleClose}>Modifier</MenuItem>
              <MenuItem onClick={() => handleClose}>Supprimer</MenuItem>
            </Menu>
        </Fab>
      </CardActions>
    </Card>
  )
}
