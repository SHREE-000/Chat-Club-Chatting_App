import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { styled } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput"
import { setMessages } from "../../features/chatting/chattingSlice";

const Wrapper = styled('div')({
    flexGrow: 1,
});

const MessengerContent = () => {
  const { chosenChatDetails } = useSelector( (state) => state.chat)

  useEffect( () => {
    // fetching chat history from specific user id
  }, [chosenChatDetails])

  return (
    <Wrapper>
      <Messages 
      />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
