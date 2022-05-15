import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const MicButton = ({localStream}) => {
    const [micEnabled, setMicEnabled] = useState(true)

    const handlTogglemic = () => {
      localStream.getAudioTracks()[0].enabled = !micEnabled;
      setMicEnabled(!micEnabled)
    };
  return (
    <IconButton onClick={handlTogglemic} style={{color: 'white'}}>
    {micEnabled ? <MicIcon /> : < MicOffIcon/>}
    </IconButton>
  )
}

export default MicButton;