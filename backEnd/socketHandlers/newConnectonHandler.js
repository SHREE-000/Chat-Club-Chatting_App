// NEW_CONNECTION socket.emit('connect', (socket)=>{})
const serverStore = require("../serverStore");
const friendsUpdate = require("../socketHandlers/updates/friends");
const { upadateRooms } = require('./updates/rooms');

const newConnectionHandler = async (socket, io) => {
  const userDetails = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userDetails.userId,
  });

  // update pending friends invitations list
  friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);

  // update friends list
  friendsUpdate.updateFriends(userDetails.userId);

  setTimeout( () => {
    upadateRooms(socket.id)
  }, [500]);
  
};

module.exports = newConnectionHandler;