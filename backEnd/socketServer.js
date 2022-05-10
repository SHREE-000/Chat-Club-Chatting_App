const authSocket = require("./middleware/authSocket");
const { disconnectHandler } = require("./socketHandlers/disconnectHandler");
const connectionHandler = require("./socketHandlers/connectionHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const { SocketEvents } = require("./utils/socket.util");
const setSocketServerInstance = require('./socketHandlers/mongodb/setSocketServerInstance');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const 
{  
  getSocketServerInstance, 
  getSocketForChat,
} = require('./socketHandlers/updates/chat')

const registerSocketServer = (server) => {
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      method: ["GET, POST"],
    },
  });

  setSocketServerInstance(io)
  getSocketServerInstance(io)   

  io.use((socket, next) => {
    authSocket(socket, next); 
  });

  io.on(SocketEvents.CONNECTION, (socket) => {
    // console.log(socket.id ,'-', socket.user.userId, 'its socket and idddddddd');
    connectionHandler(socket, io);
    directMessageHandler(socket)
    directChatHistoryHandler(socket)
    getSocketForChat(socket)
    
    socket.on(SocketEvents.DISCONNECT, () => disconnectHandler(socket));
  });
};

module.exports = {
  registerSocketServer,
};
