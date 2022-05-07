import { Tooltip, Typography, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "../../../shared/components/Avatar";
import InvitationDecisionButtons from './InvitationDecisionButtons';
import { useSelector } from 'react-redux';

const PendingInvitationsListItem = ({
  id,
  username,
  mail,
  acceptFriendInvitation,
  rejectFriendInvitation
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  // const handleAcceptInvitation = () => {
  //   acceptFriendInvitation({ id });
  // };

  // const handleRejectInvitation = () => {
  //   rejectFriendInvitation({ id });
  // };

  const { pendingInvitations } = useSelector((state) => state.friends);

  useEffect( () => {
      if (!pendingInvitations[0]._id || pendingInvitations[0]._id === null) {
        setButtonDisabled(true)
      } else {
    setButtonDisabled(false)
  }
    },[]);


  return (
      <Tooltip title={mail} >
    
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar username={username} />
          <Typography
            sx={{
              marginLeft: "7px",
              fontWeight: 700,
              color: "#8e9297",
              flexGrow: 1,
            }}
            variant="subtitle1"
          >
            {username}
          </Typography>
          <InvitationDecisionButtons 
          id={id}
          username={username}
        disabled={buttonDisabled}
        acceptInvitationHandler={acceptFriendInvitation}
        rejectInvitationHandler={rejectFriendInvitation}
        />
        </Box>
      </div>

    </Tooltip>
  );
};

export default PendingInvitationsListItem;
