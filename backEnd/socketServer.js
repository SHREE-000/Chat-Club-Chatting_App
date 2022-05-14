const verifyTokenSocket = require("./middleware/authSocket");
const serverStore = require("./serverStore");
const directMessageHandler = require("./socketHandlers/directMessageHandler");
const disconnectionHandler = require("./socketHandlers/disconnectionHandler");
const newConnectonHandler = require("./socketHandlers/newConnectonHandler");
const { SocketEvents } = require("./socketHandlers/socket.util");
const directChatHistoryHandler = require('./socketHandlers/directChatHistoryHandler');
const roomCreateHandler = require('./socketHandlers/roomCreateHandler');
const roomJoinHandler = require('./socketHandlers/roomJoinHandler');
const registerSocketServer = (server) => {
const roomLeaveHandler = require('./socketHandlers/roomLeaveHandler');
  const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      method: ["GET, POST"],
    },
  });

  serverStore.setSocketServerInstance(io)

  io.use((socket, next) => {
    verifyTokenSocket(socket, next); 
  });

  const emitOnlineUsers = () => {
    const onlineUsers = serverStore.getOnlineUsers();
    io.emit("online-users", { onlineUsers });
  };

  io.on(SocketEvents.CONNECTION, (socket) => {
    console.log(socket.id ,'-', socket.user.userId, 'its socket and idddddddd');

    newConnectonHandler(socket, io)
    emitOnlineUsers();

    socket.on("direct-message", (data) => {
      directMessageHandler(socket, data)
    })

    socket.on("direct-chat-history", (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on("room-create", () => {
      roomCreateHandler(socket);
    });

    socket.on('room-join', (data) => {
      roomJoinHandler(socket, data)
    })

      socket.on('room-leave', (data) => {
        roomLeaveHandler(socket, data)
      })

    socket.on(SocketEvents.DISCONNECT, () => disconnectionHandler(socket, io));
  });

  setInterval(() => {
    emitOnlineUsers();
  }, [1000 * 8]);

};

module.exports = {
  registerSocketServer,
};
