import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5002/api/friend-invitation";

// Get user from localStorage

const initialState = {
  sendPendingFriendsInvitatios: [],
  pendingInvitations: [],
  rejcetdFriendsInvitaitons: [],
  friends: [],
  successMessage: "",
  errorMessage: "",
  messageForAcceptRequest: "",
  messageForRejectRequest: "",
  errorMsgForSocket: "",
};
let errorFromCatch;

export const getFriends = createAsyncThunk(
  `${API_URL}/friends`,
  async (undefined, { getState }) => {
    try {
      const token = getState().auth.user.userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios
        .get(`${API_URL}/friends`, config)
        .catch((error) => {
          errorFromCatch = error.response.data;
        });

      return response.data;
    } catch (error) {}
  }
);

export const acceptPendingFriendRequest = createAsyncThunk(
  `${API_URL}/acceptrequest`,
  async (id, { getState }) => {
    const token = getState().auth.user.userDetails.token;
    try {
      const data = {
        id: id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios.post(`${API_URL}/acceptrequest`, data, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deletePendingFriendRequest = createAsyncThunk(
  `${API_URL}/deleterequest`,
  async (id, { getState }) => {
    const token = getState().auth.user.userDetails.token;
    try {
      const data = {
        id: id,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios.post(`${API_URL}/deleterequest`, data, config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getPendingListFriends = createAsyncThunk(
  `${API_URL}/friendslist`,
  async (undefined, { getState }) => {
    try {
      const token = getState().auth.user.userDetails.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response = await axios
        .get(`${API_URL}/friendslist`, config)
        .catch((error) => {
          errorFromCatch = error.response.data;
        });

      return response.data;
    } catch (error) {}
  }
);
// Invite a friend
export const invitation = createAsyncThunk(
  "http://localhost:5002/api/friend-invitation/invite",
  async (userMail, { getState }) => {
    const token = getState().auth.user.userDetails.token;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        targetMailAddress: userMail,
      };
      let response = await axios
        .post(`${API_URL}/invite`, data, config)
        .catch((error) => {
          errorFromCatch = error.response.data;
        });

      return response.data;
    } catch (error) {
      // const message =
      //   (error.response &&
      //     error.response.data &&
      //     error.response.data.message) ||
      //   error.message ||
      //   error.toString();
      // return thunkAPI.rejectWithValue(message);
    }
  }
);  

export const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    resetPendingInvitation: (initialState) => {
      initialState.errorMessage = "";
      initialState.successMessage = "";
      return initialState;
    },
    resetAlertMesssagesFromInvitations: (initialState) => {
      initialState.messageForAcceptRequest = "";
      initialState.messageForRejectRequest = "";
      return initialState;
    },
    resetpendingInvitations: (initialState) => {
      initialState.pendingInvitations = "";
      initialState.sendPendingFriendsInvitatios = "";
      initialState.friends = "";
      return initialState;
    },

    setFriendOnlineUsingSocket: (state, { payload }) => {
      state.friends.map((friends) =>
        friends._id === payload.userId
          ? { ...friends, isOnline: payload.status }
          : friends
      );

      return state;
    },

    socketErrorAlertForSocket: (state, { payload }) => {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(invitation.fulfilled, (state, action) => {
        state.sendPendingFriendsInvitatios = [
          ...state.sendPendingFriendsInvitatios,
          action.meta.arg,
        ];

        if (action.payload || !action.payload === null) {
          state.successMessage = action.payload;
        } else {
          state.errorMessage = errorFromCatch;
        }
      })
      .addCase(invitation.rejected, (state, action) => {
        state.rejcetdFriendsInvitaitons = [
          ...state.rejcetdFriendsInvitaitons,
          action.meta.arg,
        ];
        state.errorMessage = errorFromCatch;
      })

      .addCase(getPendingListFriends.fulfilled, (state, action) => {
        state.pendingInvitations = action.payload;
      })
      .addCase(getPendingListFriends.rejected, (state) => {
        state.pendingInvitations = "";
      })

      .addCase(deletePendingFriendRequest.fulfilled, (state, action) => {
        state.messageForRejectRequest = action.payload;
      })
      .addCase(deletePendingFriendRequest.rejected, (state, action) => {
        state.messageForRejectRequest = action.payload;
      })

      .addCase(acceptPendingFriendRequest.fulfilled, (state, action) => {
        state.messageForAcceptRequest = action.payload;
      })
      .addCase(acceptPendingFriendRequest.rejected, (state, action) => {
        state.messageForAcceptRequest = action.payload;
      })

      .addCase(getFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(getFriends.rejected, (state) => {
        state.friends = "";
        state.onlineFriends = "";
      });
  }, 
});

export const {
  resetPendingInvitation,
  resetpendingInvitations,
  resetAlertMesssagesFromInvitations,
  setFriendOnlineUsingSocket,
  socketErrorAlertForSocket,
} = friendsSlice.actions;
export default friendsSlice.reducer;
