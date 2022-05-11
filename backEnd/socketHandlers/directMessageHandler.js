const Message = require('../models/message');
const { SocketEvents } =  require("../utils/socket.util");
const Conversation = require('../models/conversation');
const chatUpdates = require('./updates/chat');
const user = require('../models/user');
const getMessages = require('../controllers/friendInvitation/getMessages')

const directMessageHandler = async(socket) => {

    socket.on(SocketEvents.DIRECT_MESSAGE, async(data) => {

        const { userId } = socket.user
        const { receiverUserId, content } = data;

        
        //  Create new message

        const message = await Message.create({
            content: content,
            author: userId,
            date: new Date(),
            type: "DIRECT",
        });

    
        // find if conversation exist with this two users - if not create new
        const conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverUserId] },
        })
    
        if (conversation) {
            conversation.messages.push(message._id);
            await conversation.save();
    
            // perform and update to sender and receiver if is online
            chatUpdates.chatUpdateChatHistory(conversation._id.toString());
            getMessages(conversation._id.toString())
        } else {
            //create new conversation if not exists
            const newConversation = await Conversation.create({
                messages: [message._id],
                participants: [userId, receiverUserId],
            });
            // perfrom adn update to sender and receiver if is online
            chatUpdates.chatUpdateChatHistory(newConversation._id.toString());
            getMessages(newConversation._id.toString())

        } 

    })


}

module.exports = directMessageHandler;