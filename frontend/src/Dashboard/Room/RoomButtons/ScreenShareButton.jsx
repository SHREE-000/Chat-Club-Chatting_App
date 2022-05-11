import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

const ScreenShareButton = () => {
    const [sharingEnabled, setSharingEnabled] = useState(true)

    const handlToggleSharing = () => {
        setSharingEnabled(!sharingEnabled)
    };
  return (
    <IconButton onClick={handlToggleSharing} style={{color: 'white'}}>
    {sharingEnabled ? <ScreenShareIcon /> : < StopScreenShareIcon/>}
    </IconButton>
  )
}

export default ScreenShareButton;