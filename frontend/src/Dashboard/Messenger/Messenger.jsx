import React, {useEffect} from 'react'
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import WelcomeMessage from './WelcomeMessage';
import MessengerContent from './MessengerContent';

const MainContainer = styled('div')({
    flexGrow: 1,
    backgroundColor: '#36393f',
    marginTop: '48px',
    display: 'flex'
});

const Messenger = () => {
  const { chosenChatDetails } = useSelector( (state) => state.chat)
  return (
    <MainContainer>
      {!chosenChatDetails  ?
      <WelcomeMessage /> :
      <MessengerContent 
      chosenChatDetails={chosenChatDetails} />
      }
    </MainContainer>
  )
}

export default Messenger;