import io from "socket.io-client";
// import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  setFriends,
  setPendingFriendsInvitations,
} from "../features/friends/friendsSlice";
import {
  invitation,
  setFriendOnlineUsingSocket,
} from "../features/friends/friendsSlice";
import { useUpdateDirectChatHistoryIfActive } from "../shared/utils/chat";
import * as roomHandler from "./roomHandler";

let socket = null;

export const connectWithSocketServer = (userDetails, dispatch) => {
  const jwtToken = userDetails.userDetails.token;
  socket = io("http://localhost:5002", {
    auth: {
      token: jwtToken,
    },
  });

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("friends-invitations", (data) => {
    const { pendingInvitations } = data;
    dispatch(setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on("friends-list", (data) => {
    const { friends } = data;
    dispatch(setFriends(friends));
    localStorage.setItem("friends", JSON.stringify(friends));
  });

  socket.on("online-users", (data) => {
    const { onlineUsers } = data;
    dispatch(setFriendOnlineUsingSocket(onlineUsers));
  });

  socket.on("direct-chat-history", (data) => {
    console.log(data);
    useUpdateDirectChatHistoryIfActive(data, dispatch);
  });

  socket.on("room-create", (data) => {
    console.log(data);
    roomHandler.newRoomCreated(data, dispatch);
  });

  socket.on("active-rooms", (data) => {
    roomHandler.updateActiveRooms(data, dispatch);
  });

  socket.on("conn-prepare", (data) => {
    console.log("prepare for connection");
    console.log(data);
  });
  
};

export const sendDirectMessage = (data) => {
  socket.emit("direct-message", data);
};

export const createNewRoom = () => {
  socket.emit("room-create");
};

export const joinRoom = (data) => {
  socket.emit("room-join", data);
};

export const leaveRoom = (data) => {
  socket.emit("room-leave", data);
};
