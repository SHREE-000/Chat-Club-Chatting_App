import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'
import * as roomHandler from '../../../realtimeCommunication/roomHandler';
import { useDispatch } from 'react-redux';

const CloseRoomButton = () => {
  const dispatch = useDispatch()

    const handleLeaveRoom = () => {
        roomHandler.leaveRoom(dispatch);
    };
  return (
    <IconButton onClick={handleLeaveRoom} style={{color: 'white'}}>
    <CloseIcon />
    </IconButton>
  )
}

export default CloseRoomButton;