const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
