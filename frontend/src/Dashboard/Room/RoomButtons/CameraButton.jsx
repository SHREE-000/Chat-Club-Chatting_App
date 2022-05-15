import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import VideoCamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';

const CameraButton = ({localStream}) => {
    const [cameraEnabled, setCamerEnabled] = useState(true)

    const handlToggleCamera = () => {
      localStream.getVideoTracks()[0].enabled = !cameraEnabled;
      setCamerEnabled(!cameraEnabled);
    };
  return (
    <IconButton onClick={handlToggleCamera} style={{color: 'white'}}>
    {cameraEnabled ? <VideocamIcon /> : < VideoCamOffIcon/>}
    </IconButton>
  )
}

export default CameraButton;