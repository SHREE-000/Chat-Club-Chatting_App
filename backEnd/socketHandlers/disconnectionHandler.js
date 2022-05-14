const serverStore = require('../serverStore')

const disconnectionHandler = async (socket, io) => {
  serverStore.removeConnectedUser(socket.id)
};

module.exports = disconnectionHandler;
