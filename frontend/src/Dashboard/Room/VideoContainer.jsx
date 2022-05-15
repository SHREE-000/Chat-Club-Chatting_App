import React from 'react'
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import Video from './Video';

const MainContainer = styled('div')({
    height: '85%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
});

const VideoContainer = () => {
  const { localStream } = useSelector( (state) => state.room  )
  console.log(localStream, 'its local stream');
  return (
    <MainContainer>
      <Video stream={localStream} isLocalStream/>
    </MainContainer>
  )
}

export default VideoContainer;