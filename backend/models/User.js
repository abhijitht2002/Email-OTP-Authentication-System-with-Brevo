const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: String
    ,
    otp: String,
    otpExpires: Date,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  { timestamp: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
