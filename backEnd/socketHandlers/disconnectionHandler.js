const serverStore = require('../serverStore')
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectionHandler = async (socket, io) => {
  serverStore.removeConnectedUser(socket.id)

  activeRooms.forEach((activeRoom) => {
    const userInRoom = activeRoom.participants.some(
      (participant) => participant.socketId === socket.id
    );

    if (userInRoom) {
      roomLeaveHandler(socket, { roomId: activeRoom.roomId });
    }
  });

  serverStore.removeConnectedUser(socket.id);

};

module.exports = disconnectionHandler;
