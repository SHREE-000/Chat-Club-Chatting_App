const authSocket = require("./middleware/authSocket");
const { disconnectHandler } = require("./socketHandlers/disconnectHandler");
const connectionHandler = require("./socketHandlers/connectionHandler");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const { SocketEvents } = require("./utils/socket.util");
const setSocketServerInstance = require('./socketHandlers/mongodb/setSocketServerInstance');
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const { chatUpdateChatHistory, getSocketServerInstance } = require('./socketHandlers/updates/chat')

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
    connectionHandler(socket, io);
    directMessageHandler(socket)
    // directChatHistoryHandler(socket)
    
    socket.on(SocketEvents.DISCONNECT, () => disconnectHandler(socket));
  });
};

module.exports = {
  registerSocketServer,
};
