import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../features/chatting/chattingSlice";
import React, { useEffect } from "react";

export const useUpdateDirectChatHistoryIfActive = (data, dispatch) => {
    
    const { participants, messages } = data;
    const userFromLocalStorage = localStorage.getItem('user')
    const user = JSON.parse(userFromLocalStorage);
    const userId = user.userDetails.id;
    const chosenChatIdFromLocalStorage = localStorage.getItem('setChosenChatDetails')
    const receiverId = JSON.parse(chosenChatIdFromLocalStorage)

    if (receiverId && userId) {
      const usersInCoversation = [receiverId, userId];

      updateChatHistoryIfSameConversationActive({
        participants,
        usersInCoversation,
        messages,
        dispatch
      });
    }
  };

  const updateChatHistoryIfSameConversationActive = ({
    participants,
    usersInCoversation,
    messages,
    dispatch
  }) => {
    const result = participants.every(function(participantId) {
      return usersInCoversation.includes(participantId);
    });

    if (result) {
      dispatch(setMessages(messages));
    }

  return null;
};
