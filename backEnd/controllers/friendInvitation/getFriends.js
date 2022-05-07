const User = require("../../models/user");



const getFriends = async (req, res) => {
     
  const friendsIds = await User.findOne(
    { _id: req.user.userId },
    { friends: 1, _id: 0 }
  );

  const friendsDetails = await User.find({ _id: { $in: friendsIds.friends } })

  res.status(200).json(friendsDetails);
};

module.exports = getFriends;
