import React, { useRef, useEffect } from 'react'
// import styled from '@emotion/styled/types/base';
import { styled } from '@mui/system';
import DUMMY_MESSAGES from './DUMMY_MESSAGES';
import MessagesHeader from './MessagesHeader';
import Message from './Message';

const MainContainer = styled('div')({
    height: 'calc(100% - 60px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
})

const Messages = () => {

    
  return (
    <MainContainer>
        <MessagesHeader 
        />
        {DUMMY_MESSAGES.map( (messages, index) => {
          return <Message 
          key={messages._id}
          content={messages.content}
          username={messages.author.username}
          sameAuthor={messages.sameAuthor}
          date={messages.date}
          sameDay={messages.sameDay}
          />
        })}
    </MainContainer>
  )
}

export default Messages;