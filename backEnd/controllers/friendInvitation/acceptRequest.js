const User = require('../../models/user');

    const acceptRequest = async (req, res) => {

        const acknowledgedFromCurrentAdd = await User.updateOne(
        { _id: req.user.userId },
        {
          $addToSet: {
            friends: req.body.id,
          },
        },
        {
          new: true
        }
      ).exec();
    
      const acknowledgedFromFriendAdd = await User.updateOne(
        { _id: req.body.id },
        {
          $addToSet: {
            friends: req.user.userId,
          },
        },
        {
          new: true
        }
      ).exec();
    
      if (acknowledgedFromCurrentAdd.acknowledged &&
          acknowledgedFromFriendAdd.acknowledged ) {

        const acknowledgedFromCurrentRemove = await User.updateOne(
            { _id: req.user.userId },
            {
              $pull: {
                pendingFriends: req.body.id,
              },
            }
          );
        
          // const acknowledgedFromFriendRemove = await User.updateOne(
          //   { _id: req.body.id },
          //   {
          //     $pull: {
          //       pendingFriends: req.user.userId,
          //     },
          //   }
          // );

          if (acknowledgedFromCurrentRemove.acknowledged) {
              res.status(200).send('Successfully added  to your friend list');
        }
        
    }

}

module.exports = acceptRequest;         