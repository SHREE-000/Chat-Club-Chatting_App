import { Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';

const ChooseOptionLabel = () => {

  const { chosenChatDetails } = useSelector( (state) => state.chat)
  return (
    <Typography
    sx=
    {{ 
      fontSize: '16px', 
    color: 'white', 
    fontWeight: 'bold' 
  }}
    >
      {`${chosenChatDetails ? 
        `Chosen conversation: ${chosenChatDetails.username}` : 
        ''}`}
    </Typography>
  )
}

export default ChooseOptionLabel;