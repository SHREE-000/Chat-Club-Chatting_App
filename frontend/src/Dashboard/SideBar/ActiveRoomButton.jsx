import { Avatar, Tooltip } from '@mui/material';
import React from 'react'
import Button from '@mui/material/Button';
import * as roomHandler from '../../realtimeCommunication/roomHandler';
import { useDispatch } from 'react-redux';

const ActiveRoomButton = ({
    creatorUsername,
    roomId,
    amountOffParticipants,
    isUserInRoom,
}) => {
    const dispatch = useDispatch()

    const handleJoinActiveRoom = () => {
        if (amountOffParticipants < 4) {
            // Join room
            roomHandler.joinRoom(roomId, dispatch)
        }
    };

    const activeRoomButtonDisabled = amountOffParticipants > 3;
    const roomTitle = `Creator: ${creatorUsername}. Connected: ${amountOffParticipants}`;
  return (
    <Tooltip title={roomTitle}>
        <div>
        <Button
            style={{
                width: '48px',
                height: '48px',
                borderRadius: '16px',
                margin: 0,
                padding: 0,
                minWidth: 0,
                marginTop: '10px',
                color: 'white',
                backgroundColor: '#5865F2'
            }} 
        disabled={activeRoomButtonDisabled || isUserInRoom}
        onClick={handleJoinActiveRoom}>
            <Avatar username={creatorUsername} />
        </Button>
        </div>
        </Tooltip>
  )
}

export default ActiveRoomButton;