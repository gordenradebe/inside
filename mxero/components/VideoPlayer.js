import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import { Context } from '../pages/Context';
import Side from './Side';
import Notifications from './Notifications';


//import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '190px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '190px',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      padding: '15px',
      margin: '15px',
  
    },
  },
  paper: {
    padding: '7px',
    border: '2px solid pink',
    margin: '10px',
    width: '430px',
    height:'350px',
  },

  video_v: {
    padding: '7px',
    border: '2px solid pink',
    width: '430px',
    height: '350px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '30px',
    },
  
  }
 
}));

const VideoPlayer = ( ) => {

  const {name, callAccepted, myVideo, userVideo, callEnded, stream, call} = useContext(Context);
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
    {stream && (
      <Paper className={classes.paper}>
        <Grid item xs={6} md={6}>
          <Side/>  
          <video 
          controls ={true}
           playsInline muted ref={myVideo} autoPlay className={classes.video} />
             <Notifications />
        </Grid>
      </Paper>
    )}
    {callAccepted && !callEnded && (
      <Paper >
        <Grid item xs={12} md={6}>
          <video
          controls ={true}
           playsInline ref={userVideo} autoPlay className={classes.video_v} />
        </Grid>
      </Paper>
    )}
  </Grid>

  );
};

export default VideoPlayer;