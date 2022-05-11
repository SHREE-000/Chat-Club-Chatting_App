import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'


const CloseRoomButton = () => {

    const handleLeaveRoom = () => {
        // setMicEnabled(!micEnabled)
    };
  return (
    <IconButton onClick={handleLeaveRoom} style={{color: 'white'}}>
    <CloseIcon />
    </IconButton>
  )
}

export default CloseRoomButton;