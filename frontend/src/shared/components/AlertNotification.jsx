import React from 'react'
import Stack from '@mui/material/Stack';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertNotification({
  notificationLogin, 
  notificationContactSuccess, 
  notificationContactFail, 
  errorMessageFromAddFriend,
  successMessageFromAddFriend,
  errorMessageFromDeleteFriendRequest,
  successMessageFromDeleteFriendRequest
}) {

const errorCondittion = 
errorMessageFromAddFriend || 
errorMessageFromDeleteFriendRequest || 
notificationContactFail || 
notificationLogin;

const successCondition =
notificationContactSuccess || 
successMessageFromAddFriend ||
successMessageFromDeleteFriendRequest;

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      { successCondition &&
      <Alert severity="success">
      {notificationContactSuccess}
      {successMessageFromAddFriend}
      {successMessageFromDeleteFriendRequest}
      </Alert> }

        {errorCondittion && (
          <Alert severity="error" >
            {errorMessageFromAddFriend}
            {errorCondittion}
            {notificationLogin}
            {errorMessageFromDeleteFriendRequest}
          </Alert>
        )}

    </Stack>
  );
}

