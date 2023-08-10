const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    rquired: [true, "Name is required."],
  },
  email: {
    type: String,
    rquired: [true, "Email is required."],
  },
  password: {
    type: String,
    rquired: [true, "password is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const userModel = mongoose.model("authentication", userSchema);
module.exports = userModel;
