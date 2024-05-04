const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  username: { type: String, required: false },
  gender: { type: String, required: false },
  age: { type: Number, required: false },
  createdAt: { type: Date, default: Date.now },
  isVip: { type: Boolean, required: false, default: false },
  priorityGenderOfInterlocutor: { type: String, required: false },
});

const User = mongoose.model("User", usersSchema);

module.exports = User;
