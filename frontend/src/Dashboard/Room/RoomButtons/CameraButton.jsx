import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import VideoCamOffIcon from '@mui/icons-material/VideocamOff';
import VideocamIcon from '@mui/icons-material/Videocam';

const CameraButton = () => {
    const [cameraEnabled, setCamerEnabled] = useState(true)

    const handlToggleCamera = () => {
        setCamerEnabled(!cameraEnabled)
    };
  return (
    <IconButton onClick={handlToggleCamera} style={{color: 'white'}}>
    {cameraEnabled ? <VideocamIcon /> : < VideoCamOffIcon/>}
    </IconButton>
  )
}

export default CameraButton;