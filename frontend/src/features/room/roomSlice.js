import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5002/api/friend-invitation";

const initialState = {
    isUserInRoom: false,
    isRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStream: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
}

export const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setOpenRoom: (state, {payload}) => {
            console.log(payload, 'its payloaddddd');        
            return {
                ...state,
                isRoomCreator : payload,
                isUserInRoom : payload,
            }
        }  
    }
});

export const 
{ 
    setOpenRoom, 
} = roomSlice.actions;
export default roomSlice.reducer;