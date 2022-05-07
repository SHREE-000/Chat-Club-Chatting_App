const postInvite = require('./postInvite')
const getPendingList = require('./getPendingList')
const acceptRequest = require('./acceptRequest')
const deleteRequest = require('./deleteRequest')
const getFriends = require('./getFriends')

exports.controllers = {
    postInvite,
    getPendingList,
    acceptRequest,
    deleteRequest,
    getFriends
}