const User = require("../../models/user");

const deleteRequest = async (req, res) => {

    const acknowledgedFromCurrent = await User.updateOne(
    { _id: req.user.userId },
    {
      $pull: {
        pendingFriends: req.body.id,
      },
    }
  );

  // const acknowledgedFromFriend = await User.updateOne(
  //   { _id: req.body.id },
  //   {
  //     $pull: {
  //       pendingFriends: req.user.userId,
  //     },
  //   }
  // );

  if (acknowledgedFromCurrent.acknowledged) {
      res.status(200).send('Successfully deleted the invitation');
      }

  
};

module.exports = deleteRequest;
