const User = require("../../models/user");
// const friendInvitation = require("../../models/friendInvitation");
const { db } = require("../../models/user");

let friendList;


const getPendingList = async (req, res) => {
  friendList = await User.findOne(
    { _id: req.user.userId },
    { pendingFriends: 1, _id: 0 }
  );

const pendingFriendsDetails = await User.find({ _id: { $in: friendList.pendingFriends } })

res.status(200).json(pendingFriendsDetails);
};

module.exports = getPendingList;
