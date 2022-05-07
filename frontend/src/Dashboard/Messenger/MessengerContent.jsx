import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput";

const Wrapper = styled('div')({
    flexGrow: 1,
});



// useEffect(() => {
//   if (user || !user.user === null) {
//     const token = user.user.userDetails.token;

//     const socket = io("http://localhost:5002", {
//       auth: {
//         token,
//       },
//     });

//     setSocket(socket);
//   }
// }, [user]);

const MessengerContent = () => {

  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth);
    const { chosenChatDetails } = useSelector( (state) => state.chat)

    console.log('some changes made')
    
    useEffect( () => {

    if (user || !user.user === null) {

              // Todo
        // fetching chat history from specific userId

    const token = user.user.userDetails.token;

    const socket = io("http://localhost:5002", {
      auth: {
        token,
      },
    });

    setSocket(socket);


  socket.emit("direct-chat-history",
  {receiverUserId: chosenChatDetails.id})

  }

    }, [chosenChatDetails])
  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
