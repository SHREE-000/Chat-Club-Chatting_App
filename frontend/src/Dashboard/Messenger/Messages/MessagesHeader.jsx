import React from 'react'
import { Typography } from '@mui/material';
import  Avatar  from '../../../shared/components/Avatar';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';

const MainContainer = styled('div')({
    width: '98%',
    display: 'column',
    marginTop: '10px',
})
const MessagesHeader = () => {
    const { chosenChatDetails } = useSelector( (state) => state.chat)

  return (
    <MainContainer>
        <Avatar large username={chosenChatDetails && 
            chosenChatDetails.username}/>
        <Typography
        variant='h4'
        sx={{
            fontWeight: 'bold',
            color: 'white',
            marginLeft: '5px',
            marginRight: '5px'
        }}
        >
            {chosenChatDetails && 
            chosenChatDetails.username}

        </Typography>
        <Typography
        sx={{
            color: '#b9bbbe',
            marginLeft: '5px',
            marginRight: '5px'
        }}>
            This is the beginning of your conversation with
            {' '}
            {chosenChatDetails && 
            chosenChatDetails.username}
        </Typography>
    </MainContainer>
  )
}

export default MessagesHeader;