const { Types } = require("mongoose");
const user = require("../models/user");
const io = require('socket.io')
const { connectedUsers } = require("../utils/socket.util");

const disconnectHandler = async (socket, io) => {
  const { userId } = socket.user;
  const socketId = socket.id;
  if (connectedUsers.has(socketId)) {
    connectedUsers.delete(socketId);
    const onlineDetails = await user.updateOne(
      {
        _id: new Types.ObjectId(userId),
      },
      {
        $set: { 
          isOnline: false,
        },
      }
    );

    socket.emit("online-status", {userId, isOnline: false});
  }

  // db status change
  // get online friends
  // send "online-status" event to online friends, "through their socketId"
  // io.to(<socketId>).emit(<event-name>, <data>)
};

module.exports = {
  disconnectHandler,
};
