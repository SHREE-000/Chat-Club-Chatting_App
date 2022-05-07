const SocketEvents = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",

  ONLINE_STATUS: "online-status",
  DIRECT_MESSAGE: "direct-message",
  DIRECT_CHAT_HISTORY: "direct-chat-history",
};
Object.freeze(SocketEvents);

const connectedUsers = new Map();
const onlineUsers = new Set();

module.exports = {
  connectedUsers,
  onlineUsers,
  SocketEvents,
};
