import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Context } from '../pages/Context';

const Notifications = () => {
  
    const { answerCall, call, callAccepted } = useContext(Context);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="contained" color="primary" onClick={answerCall}>
            add to classroom
          </Button>
        </div>
      )}
    </>
  );
};

export default Notifications;