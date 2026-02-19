const { Resend } = require("resend");
const dotenv = require("dotenv");
const { default: axios } = require("axios");
dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY);

const sentMail = async (email, otp) => {
    try {
        console.log("RESEND KEY EXISTS:", !!process.env.BREVO_API_KEY);
        console.log("Sending OTP to:", email);

        const response = await axios.post("https://api.brevo.com/v3/smtp/email",
            {
                sender: {
                    name: "OTP Verification",
                    email: process.env.EMAIL_SENDER
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: "Your OTP Code",
                htmlContent: `<p>Your OTP is <strong>${otp}</strong></p>`,
            },
            {
                headers: {
                    "api-key": process.env.BREVO_API_KEY,
                    "Content-Type": "application/json",
                },
            }
        )

        console.log("Brevo response:", response);

    } catch (error) {
        console.error("Resend Mail Error:", error);
        throw new Error("failed to send OTP email");
    }
}

module.exports = { sentMail }
