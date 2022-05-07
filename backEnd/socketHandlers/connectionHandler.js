const { Types } = require("mongoose");
const user = require("../models/user");
const { connectedUsers, onlineUsers, SocketEvents } = require("../utils/socket.util");

const connectionHandler = async (socket, io) => {
  const { userId } = socket.user;
  const socketId = socket.id;

  connectedUsers.set(socketId, { userId });
  onlineUsers.add(userId);

  const onlineDetails = await user.updateOne( 
    {
      _id: new Types.ObjectId(userId),
    },
    {
      $set: {
        isOnline: true,
      },
    }
  );

  socket.emit(SocketEvents.ONLINE_STATUS, {userId, isOnline: true})
  


  // db status change
  // get online friends
  // send "online-status" event to online friends, "through their socketId"
  // io.to(<socketId>).emit(<event-name>, <data>)
};

module.exports = connectionHandler;
