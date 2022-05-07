const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // Check user exists or not
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      return res.status(409).send("E-mail already in use")
    }

    // Encrypt password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create user document and save in database
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        username: user.username,
        mail: user.mail,
        token: token,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Failed, Please try later");
  }
};

module.exports = postRegister;
