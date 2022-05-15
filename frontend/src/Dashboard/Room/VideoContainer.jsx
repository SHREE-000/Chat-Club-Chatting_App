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
// addNewRemoteStream
const VideoContainer = () => {
  const { localStream, remoteStream } = useSelector( (state) => state.room  )
  console.log(localStream, 'its local stream from Video Container');
  return (
    <MainContainer>
      <Video stream={localStream} isLocalStream/>
      {remoteStream.map(stream => <Video 
      stream={stream}
      key={stream.id}
      />)}
    </MainContainer>
  )
}

export default VideoContainer;