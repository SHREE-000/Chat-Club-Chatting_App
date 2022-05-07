const contact_message = require('../../models/contact_message')

const postMessage = async (req, res) => {

    try {
      // Get user input
      const { username, email, message } = req.body;
  
      // Validate user input
      if (!(email && message && username)) {
        res.status(400).send("All input is required");
      }
  
      // Create user in our database
      const msg = await contact_message.create({
        username,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        message,
      });
  
      const created = await msg.save();
  
      if (created) {
        res.status(200).json({ message: "Registered in" });
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  module.exports = postMessage;