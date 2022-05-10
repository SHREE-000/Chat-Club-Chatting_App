const Conversation = require('../../models/conversation')
const Message = require('../../models/message')
const User = require('../../models/user')

    const getMessageRouter = async (req, res) => {
    let userId

    const  receiverUserId  = req.body.receiverUserId;
    req.body.participants.map( (user) => {
        if (user != receiverUserId) {
            userId = user
        }
    })

    console.log(receiverUserId, 'its receiverUserIddddddddddddddd');
    console.log(userId, 'its userIddddddddddddddddddddddddd');

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
          let messages = conversationData.messages
          const data = {
            userId,
            messages
          }
          res.status(200).json(data)
    }



}

module.exports = {
    getMessageRouter,
};  