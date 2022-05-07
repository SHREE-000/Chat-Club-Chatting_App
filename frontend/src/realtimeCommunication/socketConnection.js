import io from 'socket.io-client'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

// let socket = null



// export const connectWithSocketServer = (userDetails) => {


//   socket.on("connect", () => {
//     console.log("succesfully connected with socket.io server");
//     console.log(socket.id);
//   });

//   socket.on("friends-invitations", (data) => {
//     const { pendingInvitations } = data;
//     store.dispatch(setPendingFriendsInvitations(pendingInvitations));
//   });

//   socket.on("friends-list", (data) => {
//     const { friends } = data;
//     store.dispatch(setFriends(friends));
//   });

//   socket.on("online-users", (data) => {
//     const { onlineUsers } = data;
//     store.dispatch(setOnlineUsers(onlineUsers));
//   });
// };

// export const useSendDirectMessage = (userDetails) => {

  // const [socket, setSocket] = useState(null);
  //  const user = useSelector((state) => state.auth);
  // useEffect( () => {
  //   if (user || !user.user === null) {
  //     const token = user.user.userDetails.token;
  
  //      socket = io("http://localhost:5002", {
  //       auth: {
  //         token,
  //       },
  //     })

      // console.log(userDetails, 'its data from useSocket direct-message')
  //     const a = socket.emit('direct-message', userDetails)
  //     console.log(a, 'its aaaaa');

  //     setSocket(socket)
  //   }
  // }, [user, sendDirectMessage])

  //  return socket;
// }; 

