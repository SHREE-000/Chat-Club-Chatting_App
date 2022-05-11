const Conversation = require('../../models/conversation')
const Message = require('../../models/message')
const User = require('../../models/user')

    const getMessageRouter = async (req, res) => {
  
    const  receiverUserId  = req.body.receiverUserId;
    const userId = req.body.userId

    if (receiverUserId && userId) {

    const conversations = await Conversation.findOne({
        participants: { $all: [userId, receiverUserId] },
        type: 'DIRECT', 
    });

    if (conversations) {
       
        
        const conversationData = await Conversation.findById(
            conversations._id.toString()
        ).populate({
            path: "messages",        
            model: Message, 
            populate: {
              path: "author",
              model: User,
              select: "username _id",
            },
          });
          let lastMessage = conversationData.messages[conversationData.messages.length - 1]
        //   const messages = conversationData.messages
          const data = {
            userId,
            lastMessage,
          }
          res.status(200).json(data)
    }

    }

}

module.exports = {
    getMessageRouter,
};  