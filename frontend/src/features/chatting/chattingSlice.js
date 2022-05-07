import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5002/api/chatting"

const initialState = {
    chosenChatDetails : null,
    chatType: null,
    messages: []
}

export const setChosenChatDetail = createAsyncThunk(
    async({chatDetails, type}) => {}
)

export const setMessage = createAsyncThunk(
    async(messages) => {}
)

export const chattingSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChosenChatDetails: (state, {payload}) => {

            // console.log(payload, 'its payloaddddd');
            return {
                ...state,
                chosenChatDetails: payload,
                chatType: payload,
                messages: []
            }
  
        },

        setMessages: (state, {payload}) => {

            return {
                ...state,
                messages: payload.messages
            }
  
        },
    }
})

export const {
    setChosenChatDetails,
    setMessages
} = chattingSlice.actions;

export default chattingSlice.reducer;