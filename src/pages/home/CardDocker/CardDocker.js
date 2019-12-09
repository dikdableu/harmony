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


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function CardDocker(props){
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = event => {
    setAnchorEl(null);
  };
  

  return(
    <Card className={classes.card} elevation={8}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://raw.githubusercontent.com/filebrowser/logo/master/banner.png"
          title={props.name[0].length > 20 ? props.name[0].replace('/','').slice(0,20) + "..." : props.name[0].replace('/','').slice(0,20)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name[0].length > 20 ? props.name[0].replace('/','').slice(0,20) + "..." : props.name[0].replace('/','').slice(0,20)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Est un outils qui permet d'administrer ses fichiers dans le cloud
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.name[0].length > 20 ? props.name[0].replace('/','').slice(0,20) + "..." : props.name[0].replace('/','').slice(0,20)}
        </Button>
        <Button size="small" color="primary">
          {props.address}
        </Button>
        <Fab size="small" variant="extended" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ marginLeft: "auto" }}>
          <MoreVertIcon/>
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Ouvrir</MenuItem>
          <MenuItem onClick={handleClose}>Modifier</MenuItem>
          <MenuItem onClick={handleClose}>Supprimer</MenuItem>
        </Menu>
      </CardActions>
    </Card>
  )
}
