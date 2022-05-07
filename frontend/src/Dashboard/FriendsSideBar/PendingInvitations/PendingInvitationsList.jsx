import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";
import { useSelector, useDispatch } from "react-redux";
import 
{ 
  getPendingListFriends, 
  deletePendingFriendRequest, 
  acceptPendingFriendRequest, 
  resetAlertMesssagesFromInvitations,
  resetpendingInvitations 
} from "../../../features/friends/friendsSlice";
import AlertNotification from '../../../shared/components/AlertNotification'

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = () => {
  

   const { 
     pendingInvitations, 
     messageForAcceptRequest, 
     messageForRejectRequest 
    } = useSelector((state) => state.friends);

    const INVITATIONS = [];
    pendingInvitations && 
    pendingInvitations.map((details) => {
        INVITATIONS.push({
        _id: details._id,
        senderId: {
          username: details.username,
          mail: details.mail,

        },
      })
  
    });

    const handleAcceptInvitation = (id) => {
      dispatch(acceptPendingFriendRequest(id))
      setTimeout( () => {
        dispatch(resetAlertMesssagesFromInvitations())
      },3000)

    }


    const handleRejectInvitation = (id) => {
      dispatch(deletePendingFriendRequest(id))
      setTimeout( () => {
        dispatch(resetAlertMesssagesFromInvitations())
      },3000)

    }

  const dispatch = useDispatch()

  const getList = async () => {
        dispatch(getPendingListFriends())
  }

    useEffect( () => {
        getList()
      return () => {
        dispatch(resetpendingInvitations())
      }
    },[ dispatch, messageForAcceptRequest, messageForRejectRequest])

  return (
    <MainContainer>
      <AlertNotification 
      errorMessageFromDeleteFriendRequest = {messageForRejectRequest}
      successMessageFromDeleteFriendRequest = {messageForAcceptRequest}
      />
      {INVITATIONS.map((invitation) => {
        return (
          <PendingInvitationsListItem
            key={invitation._id}
            id={invitation._id}
            username={invitation.senderId.username}
            mail={invitation.senderId.mail}
            acceptFriendInvitation = {handleAcceptInvitation}
            rejectFriendInvitation = {handleRejectInvitation}
          />
        );
      })}
    </MainContainer>
  );
};

export default PendingInvitationsList;
