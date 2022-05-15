import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import friendsReducer from '../features/friends/friendsSlice'
import chattingSlice from '../features/chatting/chattingSlice';
import roomSlice from '../features/room/roomSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends: friendsReducer,
        chat: chattingSlice,
        room: roomSlice,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});