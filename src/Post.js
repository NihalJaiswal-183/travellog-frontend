import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import { Delete, Edit } from '@material-ui/icons';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { Link, useHistory } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { deletePost } from './api/data.js';
// import { likePost, deletePost } from '../../../actions/posts';

import { makeStyles } from '@material-ui/core/styles';

const useStyles= makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  
  icon: {
    margin: 5,
    padding: 5,
    border: '1px solid #878787',
    borderRadius: 10
},
});

const Post = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const deletelog = async () => {    
    await deletePost(props.entry._id);
    history.push('/')
}
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={props.entry.image|| ''} title={props.entry.title} />
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{props.entry.user}</Typography> */}
        <Typography variant="body2">{moment(props.entry.visitDate).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size="small" ><MoreHorizIcon fontSize="default" /></Button>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{props.entry.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{props.entry.description}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{props.entry.commments}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
      <Delete onClick={() => deletelog()} className={classes.icon} color="error" />
        {/* <Button size="small" color="primary" >Update</Button> */}
      </CardActions>
    </Card>
  );
};

export default Post;