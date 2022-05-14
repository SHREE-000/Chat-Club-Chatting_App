const { v4: uuidv4 } = require('uuid')

const connectedUsers = new Map();
let activeRooms = [];
let io = null;

const setSocketServerInstance = (ioInstance) => {
  io = ioInstance;
};

const getSocketServerInstance = () => {
  return io;
};

const addNewConnectedUser = ({ socketId, userId }) => {
  connectedUsers.set(socketId, { userId });
  console.log("new connected users");
  console.log(connectedUsers);
};

const removeConnectedUser = (socketId) => {
    if (connectedUsers.has(socketId)) {
      connectedUsers.delete(socketId);
      console.log("new disconncted users");
      console.log(connectedUsers);
    }
  };

  const getActiveConnections = (userId) => {
    const activeConnections = [];
  
    connectedUsers.forEach(function (value, key) {
      if (value.userId === userId) {
        activeConnections.push(key);
      }
    });
  
    return activeConnections;
  };
  
  const getOnlineUsers = () => {
    const onlineUsers = [];
  
    connectedUsers.forEach((value, key) => {
      onlineUsers.push({ socketId: key, userId: value.userId });
    });
  
    return onlineUsers;
  };

  // rooms
  const addNewActiveRoom = (userId, socketId) => {
    const newActiveRoom = {
      roomCreator: {
        userId,
        socketId,
      },
      participants: [
        {
          userId,
          socketId,
        },
      ],
      roomId : uuidv4()
    };
    activeRooms = [...activeRooms, newActiveRoom];
    return newActiveRoom;
  };

  const getActiveRooms = () => {
    return [...activeRooms];
  };

  const getActiveRoom = (roomId) => {
    const activeRoom = activeRooms.find(
      (activeRoom) => activeRoom.roomId === roomId
      );
      return {
        ...activeRoom
  }
}

const joinActiveRoom = (roomId, newParticipant) => {
  const room = activeRooms.find(room => room.roomId === roomId);
  activeRooms = activeRooms.filter( (room) => room.roomId !== roomId);
  const updatedRoom = {
    ...room,
    participants: [...room.participants, newParticipant]
  }

  activeRooms.push(updatedRoom);
}

const leaveActiveRoom = (roomId, participantSocketId) => {
  const activeRoom = activeRooms.find((room) => room.roomId === roomId);

  if (activeRoom) {
    const copyOffActiveRoom = { ...activeRoom };

    copyOffActiveRoom.participants = copyOffActiveRoom.participants.filter(
      (participants) => participants.socketId !== participantSocketId
    );
    activeRooms = activeRooms.filter((room) => room.roomId !== roomId);

    if (copyOffActiveRoom.participants.length > 0) {
      activeRooms.push(copyOffActiveRoom)
    }
  }
};

module.exports = {
    addNewConnectedUser,
    setSocketServerInstance,
    getSocketServerInstance,
    removeConnectedUser,
    getActiveConnections,
    getOnlineUsers,
    addNewActiveRoom,
    getActiveRooms,
    getActiveRoom,
    joinActiveRoom,
    leaveActiveRoom,
  };