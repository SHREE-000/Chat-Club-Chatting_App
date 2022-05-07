const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})
const auth = require('../middleware/auth')
const friendInvitationControllers = require('../controllers/friendInvitation/friendInvitationControllers')

const postFriendInvitationSchema = Joi.object({
    targetMailAddress: Joi.string().email()
});

router.post(
    '/invite', 
    auth, 
    validator.body(postFriendInvitationSchema), 
    friendInvitationControllers.controllers.postInvite);

    router.get(
        '/friendslist',
        auth,
        friendInvitationControllers.controllers.getPendingList
    )

    router.post(
        '/deleterequest',
        auth,
        friendInvitationControllers.controllers.deleteRequest
    )

    router.post(
        '/acceptrequest',
        auth,
        friendInvitationControllers.controllers.acceptRequest
    )
    
    router.get(
        '/friends',
        auth,
        friendInvitationControllers.controllers.getFriends
    )

    module.exports = router;