import { Button, Typography } from '@mui/material';
import React from 'react';
import Avatar from '../../../shared/components/Avatar';
import OnlineIndicator from './OnlineIndicator';
import { setChosenChatDetails } from '../../../features/chatting/chattingSlice';
import { useDispatch, useSelector } from 'react-redux';

const FriendsListItem = ({ id, username, isOnline }) => {
    const { chattingType } = useSelector( (state) => state.chat)
    const {  messageDetails } = useSelector( (state) => state.chat)
    const dispatch = useDispatch()

  
        const handleChooseActiveConversation = () => {
            dispatch(setChosenChatDetails({id, username, chattingType} ))
            localStorage.setItem('setChosenChatDetails', JSON.stringify(id));
    }
  
 
  return (
    <Button 
    onClick={handleChooseActiveConversation}
    style={{
        width: '100%',
        height: '42px',
        marginTop: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textTransform: 'none',
        color: 'black',
        position: 'relative'
    }}
    >
        <Avatar username={username} />
        <Typography
        style={{
            marginLeft: '7px',
            fontWeight: 700,
            color: '#8e9297'
        }}
        variant='subtitle1'
        align='left'
        >
            {username}
        </Typography>
        {isOnline && <OnlineIndicator />}
        </Button>
  )
}

export default FriendsListItem;