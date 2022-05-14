import React, { useEffect, useState, useRef } from 'react'
import { Alert, Dialog }  from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { Typography } from '@mui/material';
import { validateMail }  from '../../shared/utils/validators'; 
import InputWithLabel from '../../shared/components/InputWithLabel';
import { DialogTitle } from '@mui/material';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import { invitation, resetPendingInvitation } from '../../features/friends/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import AlertNotification from '../../shared/components/AlertNotification'

const AddFriendDialog = ({
    isDialogOpen,
    closeDialogHandler,
}) => {
    const [mail, setMail] = useState()
    const [isFormValid, setIsFormValid] = useState()

    const { errorMessage, successMessage } = useSelector((state) => state.friends);

    const dispatch = useDispatch()

    const handleSendInvitation = async() => {
        dispatch(invitation(mail))
        dispatch(resetPendingInvitation())    
        setTimeout( () => {
            dispatch(resetPendingInvitation())
        },3000)
};


const handleCloseDialog = () => {
    closeDialogHandler()
    setMail('')
};

useEffect( () => {
    setIsFormValid(validateMail(mail))
}, [mail, setIsFormValid]);


return (
    <div>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>
                <Typography>Invite a Friend</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Typography>
                        Enter e-mail address of friend 
                        which you would like to invite
                    </Typography>
                    </DialogContentText>
                    <InputWithLabel 
                    label='Mail'
                    type='text'
                    value={mail}
                    setValue={setMail}
                    placeholder='Enter mail address'
                    />
            </DialogContent>
            <DialogActions>
                <CustomPrimaryButton 
                onClick={handleSendInvitation}
                disabled={!isFormValid} 
                label='Send'
                additionalStyles={{
                    marginLeft: '15px',
                    marginRight: '15px',
                    marginBottom: '10px'
                }}
                />
                </DialogActions>
                <div className="container mt-3 mb-3">
            <AlertNotification 
            errorMessageFromAddFriend = {errorMessage}
            successMessageFromAddFriend = {successMessage}
            />
        </div>
        </Dialog>
    </div>
  )
};

export default AddFriendDialog;