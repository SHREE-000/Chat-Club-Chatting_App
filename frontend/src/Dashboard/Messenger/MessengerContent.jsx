import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import Messages from "./Messages/Messages";
import NewMessageInput from "./NewMessageInput"
import { getDirectChatHistory } from '../../realtimeCommunication/socketConnection'; 

const Wrapper = styled('div')({
    flexGrow: 1,
});

const MessengerContent = () => {
  const { chosenChatDetails } = useSelector( (state) => state.chat)

  useEffect( () => {
    // fetching chat history from specific user id
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
     })
  }, [chosenChatDetails])
  console.log(chosenChatDetails);


  return (
    <Wrapper>
      <Messages 
      />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
