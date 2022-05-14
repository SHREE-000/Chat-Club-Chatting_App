const serverStore = require('../serverStore');
const roomUpdate = require('./updates/rooms');

const roomLeaveHandler = (socket, data) => {
    const { roomId } = data;
    const activeRoom = serverStore.getActiveRoom(roomId);

    if (activeRoom) {
        serverStore.leaveActiveRoom(roomId, socket.id);
        roomUpdate.upadateRooms();
    }
}

module.exports = roomLeaveHandler;