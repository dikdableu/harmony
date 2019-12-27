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
    maxWidth: 300,
    height: 319.391
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
    {console.log(props)}
      <CardActionArea>
        <div onClick={() => window.location.href = props.adresse}>
          <CardMedia
            className={classes.media}
            image={props.image}
            title={props.nom.length > 10 ? props.nom.replace('/','').slice(0,10) + "..." : props.nom.replace('/','').slice(0,10)}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.nom.length > 10 ? props.nom.replace('/','').slice(0,10) + "..." : props.nom.replace('/','').slice(0,10)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Est un outils qui permet d'administrer ses fichiers dans le cloud
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          {props.nom.length > 10 ? props.nom.replace('/','').slice(0,10) + "..." : props.nom.replace('/','').slice(0,10)}
        </Button>
        {props.adresse === "" ? null : <a rel="noopener"  style={{textDecoration: 'none'}} href={props.adresse.includes('http') || props.adresse.includes('https') ? props.adresse : 'http://' + props.adresse.includes('http')}><Button size="small" color="primary">{props.adresse}</Button></a>}
        <Fab aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ marginLeft: "auto", borderRadius:90, width: 40, height:40,}}>
          <MoreVertIcon/>
        </Fab>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => window.location.href = props.adresse}>Ouvrir</MenuItem>
          <MenuItem onClick={handleClose}>Modifier</MenuItem>
          <MenuItem onClick={handleClose}>Supprimer</MenuItem>
        </Menu>
      </CardActions>
    </Card>
    
  )
}
