import React from 'react'
import { styled } from '@mui/system';
import ScreenShareButton from './ScreenShareButton';
import MicButton from './MicButton';
import CameraButton from './CameraButton';
import CloseRoomButton from './CloseRoomButton';

const MainContainer = styled('div')({
    height: '15%',
    width: '100%',
    backgroundColor: '#5865f2',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const RoomButtons = () => {
  return (
    <MainContainer>
      <ScreenShareButton />
      <MicButton />
      <CloseRoomButton />      
      <CameraButton />
    </MainContainer>
  )
}

export default RoomButtons;