const SocketEvents = {
  CONNECTION: "connection",
  DISCONNECT: "disconnection",
  
  ONLINE_STATUS: "online-status",
  DIRECT_MESSAGE: "direct-message",
  DIRECT_CHAT_HISTORY: "direct-chat-history",
};
Object.freeze(SocketEvents);

const connectedUsers = new Map();
const onlineUsers = new Set();
const currentTotalUsers = [];
const activeConnections = [];



module.exports = {
  connectedUsers,
  onlineUsers,
  SocketEvents,
  currentTotalUsers,
  activeConnections,
};
