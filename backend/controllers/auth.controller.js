const User = require("../models/User");
const bcrypt = require("bcrypt")
const crypto = require("crypto");
const { sentMail } = require("../utils/sentMail");

const register = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(401).json({ message: "Failed to register" });

    const hashPass = await bcrypt.hash(password, 10)
    user.name = name
    user.password = hashPass
    user.otp = null
    user.otpExpires = null

    await user.save()
    res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.log("Can't register", error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

const generateOTP = async (req, res) => {
  try {
    const { email } = req.body

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ message: "Email already registered" })


    const otp = crypto.randomInt(100000, 999999).toString()
    const otpExpires = Date.now() + 10 * 60 * 1000

    const user = new User({
      email,
      otp,
      otpExpires,
      isVerified: false
    })

    await user.save()

    try {
      await sentMail(email, otp)
    } catch (mailError) {
      console.error("MAIL FAILED:", mailError);
    }

    res.status(200).json({ message: "OTP sent to mail" })

  } catch (error) {
    console.log("Can't generate OTP", error);
    res.status(500).json({ message: "Server error" });
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "Verification failed" });

    if (user.isVerified) return res.status(404).json({ message: "Already verified" });

    if (user.otp !== otp) return res.status(404).json({ message: "Invalid OTP" });

    if (user.otpExpires < Date.now()) return res.status(404).json({ message: "OTP expired" });

    user.isVerified = true
    await user.save()

    res.status(200).json({ message: "Email verification complete" });

  } catch (error) {
    console.log("OTP verification failed", error);
    res.status(500).json({ message: "Server error", error: error });
  }
}


module.exports = { register, generateOTP, verifyOTP };

