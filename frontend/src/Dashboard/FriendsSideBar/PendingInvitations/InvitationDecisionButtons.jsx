import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
 
function InvitationDecisionButtons
({ 
  id,
  username,
  disabled, 
  acceptInvitationHandler, 
  rejectInvitationHandler ,
}) {
  
  return (
    <Box sx={{display: 'flex'}}>

        <IconButton style={{ color: 'white'}}
        disabled={disabled} onClick={(e)=>acceptInvitationHandler(id, username)}
        >
            <CheckIcon />
            </IconButton>
            <IconButton style={{ color: 'white'}}
        disabled={disabled} onClick={(e)=>rejectInvitationHandler(id, username)}
        >
            <ClearIcon />
            </IconButton>
    </Box>
  )
}

export default InvitationDecisionButtons;