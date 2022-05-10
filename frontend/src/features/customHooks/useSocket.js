import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const defaultParams = {
  socketSetup: () => {},
  errorCallback: () => {},
  connectCallback: () => {},
};

export const useSocket = ( params = defaultParams) => {
  const { socketSetup, errorCallback, connectCallback } = params;

  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    if (user.user || !user.user === null) {

      const token = user.user.userDetails.token;
      const socket = io("http://localhost:5002", {
        auth: {
          token,
        },
      });

      socket.on("connect", (data) => connectCallback(data));
      socket.on("connect_error", (error) => errorCallback(error));
      // socket.on("online-status", (data) => socketSetup(data))
      // socket.emit('direct-message', (data) => {socketSetup(data)
      // console.log(data, 'its data from front end');}) 
      // socket.emit("direct-chat-history",
      // {receiverUserId: chosenChatDetails.id,},
      // )
      
      // socket.on("direct-chat-history", (data) => {
      //   setmessageDetails(data.messages)
      //   dispatch(setMessages(data.messages))
      // })


      setSocket(socket);
      socketSetup(socket);
      return () => socket.close();
    }
  }, [user, dispatch]);

  return socket;
};


  
