const User = require("../../models/user");
const friendInvitation = require("../../models/friendInvitation");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  // check if friend that we would like to invite is not user

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) { 
    return res
      .status(409)
      .send("Sorry. You cannot become friend with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await friendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  const checkFriend = await User.findById(userId);
  const registerOnFriedAccount = await User.findById(targetUser._id);

  const statusForRegisterOnFriedAccount =
  registerOnFriedAccount.pendingFriends.includes(checkFriend._id);
  const statusForcheckFriend = 
  checkFriend.pendingFriends.includes(targetUser._id);

  if (!statusForcheckFriend) {
    const checkUser = await User.findOne({_id: checkFriend._id}, {friends: {$nin: [targetUser._id]}})

    if (!checkUser) {
    await User.updateOne(
      { _id: checkFriend._id },
      { $addToSet: { pendingFriends: targetUser._id } },
      {
        new: true,
      }
    ).exec(); 
  }
  }

  // if (!statusForRegisterOnFriedAccount) {
  //   await User.updateOne(
  //     {
  //       _id: targetUser._id,
  //     },
  //     {
  //       $addToSet: {
  //         pendingFriends: checkFriend._id,
  //       },
  //     },
  //     {
  //       new: true,
  //     }
  //   ).exec();
  // }

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check if the user which we would like to invite is already our friend
  const usersAlreadyFriends = targetUser.pendingFriends.find(
    (freindId) => freindId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invitation in database
  await friendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });



  // if invitation has been successfully created we would like to update friends invitations if other user is online
  return res.status(201).send("Invitation has been sent");
};

module.exports = postInvite;
