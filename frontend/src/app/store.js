import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import friendsReducer from '../features/friends/friendsSlice'
import chattingSlice from '../features/chatting/chattingSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        friends: friendsReducer,
        chat: chattingSlice
    }
});