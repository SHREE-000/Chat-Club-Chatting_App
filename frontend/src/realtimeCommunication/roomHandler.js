import * as socketConnection from './socketConnection'
import 
{ 
    setOpenRoom, 
    setRoomDetails,
    setActiveRooms,
} from '../features/room/roomSlice'

export const createNewRoom = (dispatch) => {
    dispatch(setOpenRoom(true))
    socketConnection.createNewRoom()
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
    dispatch(setRoomDetails({roomId}));
    dispatch(setOpenRoom(false, true));
    socketConnection.joinRoom({ roomId });
    localStorage.setItem('room', JSON.stringify(roomId))
}

export const leaveRoom = (dispatch) => {
     const roomId = JSON.parse(localStorage.gettItem('room'));
     socketConnection.leaveRoom({ roomId });
     dispatch(setRoomDetails(null));
     dispatch(setOpenRoom(false, false));
}