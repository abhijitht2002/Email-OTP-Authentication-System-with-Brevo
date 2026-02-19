const express = require("express")
const { register, generateOTP, verifyOTP } = require("../controllers/auth.controller")
const router = express.Router()

router.post("/generateOTP", generateOTP)
router.post("/verifyOTP", verifyOTP)
router.post("/register", register)

module.exports = router
