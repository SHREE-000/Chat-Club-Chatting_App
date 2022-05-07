const { string } = require("joi");
const mongoose = require("mongoose");
// const Schema = mongoose.Schema

const userShema = new mongoose.Schema({
  mail: { type: String, unique: true },
  password: { type: String },
  username: { type: String },
  isOnline: false,
  friends: {
    type: [{ type: String }],
    required: false,
  },
  pendingFriends: {
    type: [{ type: String }],
    required: false,
  }
});

module.exports = mongoose.model("user", userShema);
