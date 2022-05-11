import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const MicButton = () => {
    const [micEnabled, setMicEnabled] = useState(true)

    const handlTogglemic = () => {
        setMicEnabled(!micEnabled)
    };
  return (
    <IconButton onClick={handlTogglemic} style={{color: 'white'}}>
    {micEnabled ? <MicIcon /> : < MicOffIcon/>}
    </IconButton>
  )
}

export default MicButton;