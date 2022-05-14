import React, { useState } from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import AddFriendDialog from './AddFriendDialog';
import { useSelector, useDispatch } from 'react-redux';
import { invitation } from '../../features/friends/friendsSlice';

const additionalStyles = {
    marginTop: '10px',
    marginLeft: '5px',
    width: '80%',
    height: '30px',
}

const AddFriendButton = () => {
    const dispatch = useDispatch()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const handleOpenAddFriendDialog = () => {
        setIsDialogOpen(true)
    };

    const handleCloseAddFriendDialog = () => {
        setIsDialogOpen(false)
        dispatch(invitation())
    }
  return (
    <>

    <CustomPrimaryButton 
    additionalStyles={additionalStyles}
    label='Add Friend'
    onClick={handleOpenAddFriendDialog}
    />
    <AddFriendDialog 
        isDialogOpen={isDialogOpen}
        closeDialogHandler={handleCloseAddFriendDialog}/>
    </>
  )
}

export default AddFriendButton;