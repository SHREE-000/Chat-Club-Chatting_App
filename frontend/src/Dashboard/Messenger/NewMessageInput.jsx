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
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth);
  const [messageSent, setMessageSent] = useState(false);
  const [message, setMessage] = useState();
  const { sideBarOpenForMessage, getUserId, chosenChatDetails } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    if (user || !user.user === null) {
      const token = user.user.userDetails.token;

      const socket = io("http://localhost:5002", {
        auth: {
          token,
        },
      });
      setSocket(socket);

      if (chosenChatDetails || !chosenChatDetails === null) {
        socket.emit("direct-chat-history", {
          receiverUserId: chosenChatDetails.id,
        });
      }

      socket.on("direct-chat-history", (data) => {
        dispatch(setMessages(data.messages));
      });

      dispatch(
        getMessages({
          receiverUserId: chosenChatDetails.id,
          userId: getUserId,
        })
      )


      setMessageSent(false);
    }
  }, [messageSent, dispatch, sideBarOpenForMessage, chosenChatDetails]);

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
    // dispatch(setNewMessages(event.target.value))
    // dispatch(setMessages());
  };

  const handleKeyPressed = async (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
      setMessageSent(true);
    }
  };





  const handleSendMessage = (userDetails) => {
    if (message.length > 0) {
      const emit = socket.emit("direct-message", {
        receiverUserId: chosenChatDetails.id,
        content: message,
      });
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
