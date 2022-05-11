import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as roomHandler from "../../realtimeCommunication/roomHandler";
import { useDispatch, useSelector } from 'react-redux'
import { setOpenRoom } from '../../features/room/roomSlice'

const CreateRoomButton = () => {
    const dispatch = useDispatch()

    const createNewRoomHandler = () => {
        // creating a room and sending info to the server about this
        roomHandler.createNewRoom(() => dispatch(setOpenRoom(true)))
    }
  return (
    <Button
    onClick={createNewRoomHandler}
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
    >
        <AddIcon     />
    </Button>
  )
}

export default CreateRoomButton;