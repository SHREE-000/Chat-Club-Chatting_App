import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5002/api/friend-invitation"
// get

const initialState = {
    chosenChatDetails : null,
    chatType: null,
    messageDetails: [],
    latestMessage: '',
    newMessage: false,
    messageDetailsFromDatabase: [],
    sideBarOpenForMessage: false,
    getUserId: ""
}

export const getMessages = createAsyncThunk(
    `${API_URL}/getmessage`,
    async (data, { getState }) => {
      try {
        const token = getState().auth.user.userDetails.token;
  
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
  
        let response = await axios
          .post(`${API_URL}/getmessage`, data, config)
          .catch((error) => {
            const errorFromCatch = error.response.data;
            console.log(errorFromCatch, 'errorFromCatcherrorFromCatch');
          });

          console.log(response.data,'it response from chatting slice');
  
        return response.data;
      } catch (error) {}
    }
  );

export const chattingSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChosenChatDetails: (state, {payload}) => {

            return {
                ...state,
                chosenChatDetails: payload,
                chatType: "DIRECT",
                messageDetails: []
            }               
  
        },

        setMessages: (state, {payload}) => {
            console.log(payload, 'payloaddddd');
            return {
                ...state,
                messageDetails: payload
            }
        },

        setNewMessages: (state, {payload}) => {
              return {
                  ...state,
                  latestMessage: payload
              }
          },


          setNewMessageStatus: (state, {payload}) => {
            return {
                ...state,
                newMessage: payload
            }  
        },

        setSideBarOpenForMessage: (state, {payload}) => {
            return {
                ...state,
                sideBarOpenForMessage: payload
            }
        },

    },

    extraReducers: (builder) => {
        builder

          .addCase(getMessages.fulfilled, (state, action) => {
            //   console.log(action, 'its actionnnnnnn');
        return {
            ...state, 
            messageDetailsFromDatabase : action.payload.messages,
            getUserId : action.payload.userId
        }
              
          })
          .addCase(getMessages.rejected, (state) => {
            state.messageDetailsFromDatabase = "";
          });
      },

})

export const {
    setChosenChatDetails,
    setMessages,
    setNewMessages,
    setNewMessageStatus,
    setSideBarOpenForMessage,
} = chattingSlice.actions;

export default chattingSlice.reducer;