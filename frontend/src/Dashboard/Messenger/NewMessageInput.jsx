import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { io } from "socket.io-client";
// import { useSocket } from "../../features/customHooks/useSocket";
// import { sendDirectMessage } from "../../realtimeCommunication/socketConnection";

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
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || !user.user === null) {
      const token = user.user.userDetails.token;

      const socket = io("http://localhost:5002", {
        auth: {
          token,
        },
      });

      setSocket(socket);
    }
  }, [user]);

  const [message, setMessage] = useState();
  const { chosenChatDetails } = useSelector((state) => state.chat);

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = (userDetails) => {
    if (message.length > 0) {
      // useSocket({
      //   socketSetup: (socket) => {
      //     socket.on("direct-message", {
      //       receiverUserId: chosenChatDetails.id,
      //       content: message,
      //     });
      //   },
      // });
      // setMessage('');

      socket.emit("direct-message", {
        receiverUserId: chosenChatDetails.id,
        content: message,
      });

      // useSendDirectMessage({
      //   receiverUserId: chosenChatDetails.id,
      //   content: message,
      // });
      // setMessage("");
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
