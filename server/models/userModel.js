const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minLength: [2, "Name must contain at least 2 characters."],
    maxLength: [30, "Name must not exceed 30 characters."],
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address.",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: [6, "Password must be at least 6 characters long."],
  },
});

module.exports = new mongoose.model("user", userSchema);
