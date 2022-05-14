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
    getUserId: "",
    chattingType: {
      DIRECT: 'DIRECT',
      GROUP: 'GROUP',
    },
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
          });
  
        return response.data;
      } catch (error) {}
    }
  );

// export const updateDirectChatHistoryIfActive = (data) => {
//   const { participants, messages } = data;
  
//   const getState = getState()
//   console.log(getState, 'getStateeeeeeee');

//   if (receiverId && userId) {
//     const usersInCoversation = [receiverId, userId];

//     updateChatHistoryIfSameConversationActive({
//       participants,
//       usersInCoversation,
//       messages,
//     });
//   }
// };

// const updateChatHistoryIfSameConversationActive = ({
//     participants,
//     usersInCoversation,
//     messages,
// }) => {
//   const dispatch = useDispatch()
//   const result = participants.every(function (participantId) {
//     return usersInCoversation.includes(participantId);
//   });

//   if (result) {
//     dispatch(setMessages(messages));
//   }
// };

export const chattingSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChosenChatDetails: (state, {payload}) => {
            return {
                ...state,
                chosenChatDetails: payload,
                chattingType: payload.chatType,
                messageDetails: []
            }               
  
        },

        setMessages: (state, {payload}) => {
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


          setChatType: (state, {payload}) => {
            return {
                ...state,
                DIRECT: payload,
                GROUP: payload,
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

    // extraReducers: (builder) => {
    //     builder

    //       .addCase(getMessages.fulfilled, (state, action) => {
    //         //   console.log(action, 'its actionnnnnnn');
    //     return {
    //         ...state, 
    //         messageDetailsFromDatabase : action.payload.messages,
    //         messageDetails : action.payload.lastMessage,
    //         getUserId : action.payload.userId,
    //         // messageDetails: [...state.messageDetails, action.payload.lastMessage] 
    //     }
              
    //       })
    //       .addCase(getMessages.rejected, (state) => {
    //         state.messageDetailsFromDatabase = "";
    //       });
    //   },

})

export const {
    setChosenChatDetails,
    setMessages,
    setNewMessages,
    setNewMessageStatus,
    setSideBarOpenForMessage,
} = chattingSlice.actions;

export default chattingSlice.reducer;