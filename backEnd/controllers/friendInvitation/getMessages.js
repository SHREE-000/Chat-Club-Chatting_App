const Conversation = require('../../models/conversation');
const message = require('../../models/message');
const Message = require('../../models/message')
const User = require('../../models/user')

const getMessages = async ( 
    conversationId,
    toSpecifiedSocketId = null,
  ) => {

    // const id = req.body.receiverUserId;
  
    const conversation = await Conversation.findById(conversationId).populate({
      path: "messages",
      model: Message,
      populate: {
        path: "author",
        model: User,
        select: "username _id",
      }, 
    });   
  
  if (toSpecifiedSocketId) {
    return conversation.messages;
    }
  
  
  }

  module.exports = getMessages;