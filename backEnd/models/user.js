// const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userShema = new mongoose.Schema({
  mail: { type: String, unique: true },
  password: { type: String },
  username: { type: String },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
   
module.exports = mongoose.model("User", userShema);
       