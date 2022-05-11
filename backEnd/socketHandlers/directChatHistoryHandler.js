const { SocketEvents } = require("../utils/socket.util");
const Conversation = require('../models/conversation');
const chatUpdates = require('./updates/chat');
const getMessages = require('../controllers/friendInvitation/getMessages')

const directChatHistoryHandler = async (socket) => {
    socket.on(SocketEvents.DIRECT_CHAT_HISTORY, async (data) => {
        try {
            const { userId } = socket.user;
            const { receiverUserId } = data;

            const conversation = await Conversation.findOne({
                participants: { $all: [userId, receiverUserId] },
                type: 'DIRECT', 
            });

            if (conversation) {
                chatUpdates.chatUpdateChatHistory(conversation._id.toString(), socket.id);
                getMessages(conversation._id.toString(), socket.id)
            }
            
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = directChatHistoryHandler;

