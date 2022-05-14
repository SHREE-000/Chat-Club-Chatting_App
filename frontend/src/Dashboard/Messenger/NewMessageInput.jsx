import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { io } from "socket.io-client";
import { setNewMessages } from "../../features/chatting/chattingSlice";
// import { useSocket } from "../../features/customHooks/useSocket";
// import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";
import {
  setMessages,
  getMessages,
} from "../../features/chatting/chattingSlice";
import { sendDirectMessage } from "../../realtimeCommunication/socketConnection"

const MainContainer = styled("div")({
  height: "60px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Input = styled("input")({
  backgroundColor: "#2f3156",
  width: "98%",
  height: "44px",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  padding: "0 10px",
});

const NewMessageInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const { chosenChatDetails, messageDetails } = useSelector( (state) => state.chat)


  

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = async (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };





  const handleSendMessage = (userDetails) => {
    setMessage("")

    if (message.length > 0) {
      sendDirectMessage({
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
      setMessage("");
    }
  };

  return (
    <MainContainer>
      <Input
        placeholder={`Write message to ${chosenChatDetails.username}`}
        value={message}
        onChange={handleMessageValueChange}
        onKeyDown={handleKeyPressed}
      />
    </MainContainer>
  );
};

export default NewMessageInput;
