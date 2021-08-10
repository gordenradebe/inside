import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { IconButton } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import CallEndIcon from '@material-ui/icons/CallEnd';

import { Context } from '../pages/Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignitems: 'center',
   // flexDirection: 'column',
   // marginRight: '10px',
   // width: '190px',
   // height:'199px', 
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',  
    },
  },
  container: {
    width: '400px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%', 
    },
  },
  margin: {
    marginTop: 20,
  },

  paper: {
    padding: '10px',
    border: '2px solid black',
    marginRight: '10px'
  },
}));

const Side = ({ children }) => {

const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(Context);

  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();

  return (
    <Container className={classes.container}>
            <Grid className={classes.root}>
            <CopyToClipboard text={me} >
                <IconButton>
                  <FileCopyIcon startIcon={<Assignment fontSize="large" />}/>
                  </IconButton>
              </CopyToClipboard>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <CallEndIcon startIcon={<PhoneDisabled fontSize="small" />} fullWidth onClick={leaveCall} />
              ) : (
                <IconButton>
                <PhoneIcon startIcon={<Phone fontSize="small" />} fullWidth onClick={() => callUser(idToCall)}/>
                </IconButton>
              )}
            </Grid>
    </Container>
  );
};

export default Side;
