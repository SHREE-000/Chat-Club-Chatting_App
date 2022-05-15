const serverStore = require('../serverStore');
const roomUpdate = require('./updates/rooms');

const roomLeaveHandler = (socket, data) => {
    const { roomId } = data;
    const activeRoom = serverStore.getActiveRoom(roomId);

    if (activeRoom) {
        serverStore.leaveActiveRoom(roomId, socket.id);
        const updatedActiveRoom = serverStore.getActiveRoom(roomId);

        if (updatedActiveRoom.participants) { 
            updatedActiveRoom.participants.forEach(participant => {
                socket.to(participant.socketId.emit('room-participant-left', {
                    connUserSocketId: socket.id
                }))
            });
        }
        roomUpdate.upadateRooms();
    }
}

module.exports = roomLeaveHandler;