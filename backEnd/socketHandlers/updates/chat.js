const { SocketEvents } =  require("../../utils/socket.util");
const Conversation = require('../../models/conversation');

let io = null

const getSocketServerInstance = (ioInstance) => {
    io = ioInstance
    return io;
  };

const chatUpdateChatHistory = async(
    conversationId,
    toSpecifiedSocketId = null
    ) => {
    const conversation = await Conversation.findById(conversationId)
    .populate({
        path: 'messages',
        model: 'Message',
        populate: {
            path: 'author',
            model: 'User',
            select: 'username _id',
        }
    })

    if (conversation) {

        if (toSpecifiedSocketId) {
            // console.log(toSpecifiedSocketId, 'toSpecifiedSocketIdtoSpecifiedSocketId');
            // initial update of chat history
            return io.to(toSpecifiedSocketId).emit('direct-chat-history', {
                messages: conversation.messages,
                participants: conversation.participants,
            })
        }

        // check if users of this conversation are online
        // if yes emit to them update of messages

        conversation.participants.forEach((userId) => {
            const activeConnections = getSocketServerInstance(
                userId.toString()
                ); 
                console.log(activeConnections, 'activeConnections');
                console.log(typeof activeConnections, 'typeof activeConnections');

                if (activeConnections) { 
                
            activeConnections.forEach((socketId) => {
                io.to(socketId).emit('direct-chat-history', {
                    messages: conversation.messages,
                    participants: conversation.participants,
                })
            }) 

        }    
        })
    }
}

module.exports = 
{ 
    chatUpdateChatHistory,
    getSocketServerInstance 
};