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
            return {
                ...state,
                isRoomCreator : payload,
                isUserInRoom : payload,
            }
        },
        
        setRoomDetails: (state, {payload}) => {
            return {
                ...state,
                userDetails: payload
            }
        },

        setActiveRooms: (state, {payload}) => {
            return {
                ...state,
                activeRooms: payload
            }
        },
        
        setLocalStream: (state, {payload}) => {
            console.log(payload, 'its payloaddddd from setLocalStream in roomSlice');
            return {
                ...state,
                localStream: payload
            }
        },

        setAudioOnly: (state, {payload}) => {
            return {
                ...state,
                audioOnly: payload
            }
        },

        setRemoteStreams: (state, {payload}) => {
            return {
                ...state,
                remoteStream: payload
            }
        }
    }
});

export const 
{ 
    setOpenRoom, 
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setAudioOnly,
    setRemoteStreams,
} = roomSlice.actions;
export default roomSlice.reducer;