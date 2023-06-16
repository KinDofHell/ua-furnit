const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    default: "648c33f4f4a0e1b4f812be0b",
  },
});

module.exports = mongoose.model("User", userSchema);
