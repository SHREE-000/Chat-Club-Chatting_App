const User = require("../../models/user")
const Message = require("../../models/message")
const Conversation = require("../../models/conversation");
const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const {
  currentTotalUsers,
  activeConnections,
} = require("../../utils/socket.util");
// const { findOne, findById } = require("../../models/conversation");

let socketIds = [];
let sender;
let receiver;
let io = null;
let socket = null;
const getSocketServerInstance = (ioInstance) => {
  io = ioInstance;
  return io;
};

const getSocketForChat = (socketConnection) => {
  socket = socketConnection
  return socket;
}
 

const chatUpdateChatHistory = async (
  conversationId,
  toSpecifiedSocketId = null
) => {
  // console.log(socket.id,'-',socket.user.userId, 'iits sockettttttttttt');

  const conversation = await Conversation.findById(conversationId).populate({
    path: "messages",
    model: Message,
    populate: {
      path: "author",
      model: User,
      select: "username _id",
    },
  });


  if (conversation) {
    
    conversation.participants.map( async (id) => {
      if (socket.user.userId === id.toString()) {
        sender = await User.findById(id)
      } 
      if (socket.user.userId != id.toString()) {
        receiver = await User.findById(id)
      }
      
    })
    
    
    if (toSpecifiedSocketId) {

      const checkElement = socketIds.includes(toSpecifiedSocketId)
      if (!checkElement) {
      socketIds.push(toSpecifiedSocketId)
    }

    // console.log(conversation, 'its conversationnnnnnnnnnnnnnnnnn');

      // initial update of chat history
      return io.to(toSpecifiedSocketId).emit("direct-chat-history", {
        messages: conversation.messages,
        participants: conversation.participants,
      })

    }

    // check if users of this conversation are online
    // if yes emit to them update of messages

    conversation.participants.forEach((userId) => {
        currentTotalUsers.map((users) => {
          if (users === userId.toString()) {
              console.log(userId.toString());
              const status = activeConnections.includes(users)
              if (!status) {
                activeConnections.push(users)
              }
          }
        });

      if (activeConnections) {
        activeConnections.forEach((socketId) => {
          io.to(socketId).emit("direct-chat-history", {
            messages: conversation.messages,
            participants: conversation.participants,
          });
        });
      }
    });
  }

};

module.exports = {
  chatUpdateChatHistory,
  getSocketServerInstance,
  getSocketForChat,
};
