import * as socketConnection from './socketConnection'
import 
{ 
    setOpenRoom, 
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setRemoteStreams,
} from '../features/room/roomSlice'
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = (dispatch) => {
    const onlyAudio = JSON.parse(localStorage.getItem('audioOnly'))
    const successCalbackFunc = () => {
    dispatch(setOpenRoom(true, true))
    socketConnection.createNewRoom() 
  }
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCalbackFunc, dispatch)
}

export const newRoomCreated = (data, dispatch) => {
    const { roomDetails } = data;
    dispatch(setRoomDetails(roomDetails))
}

export const updateActiveRooms = (data, dispatch) => {
    const { activeRooms } = data;
    const friends = JSON.parse(localStorage.getItem('friends'));

    const rooms = [];
    activeRooms.forEach(room => {
        friends.forEach(f=> {
            if (f.id === room.roomCreator.userId) {
                rooms.push({ ...room, creatorUsername: f.username })
            }
        })
    })
    dispatch(setActiveRooms(rooms));
}

export const joinRoom = (roomId, dispatch) => {
    const successCalbackFunc = () => {
    dispatch(setRoomDetails({roomId}));
    dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
    localStorage.setItem('room', JSON.stringify(roomId))
  }
  const onlyAudio = JSON.parse(localStorage.getItem('audioOnly'))
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCalbackFunc, dispatch)

}

export const leaveRoom = (dispatch) => {

     const localStream = JSON.parse(localStorage.getItem('stream'))
     const roomId = JSON.parse(localStorage.getItem('room'));

    //  if (localStream) {
    //      localStream.getTracks().forEach(track => track.stop());
    //      dispatch(setLocalStream(null));
    //  } 

    dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();

     socketConnection.leaveRoom({ roomId });
     dispatch(setRoomDetails(null));
     dispatch(setOpenRoom(false, false));
}