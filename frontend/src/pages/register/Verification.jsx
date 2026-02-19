import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generate, verify } from "./auth.api";

function Verification() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [otpSent, setotpSent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleGenerate = async () => {
    try {
      if (!email) return console.log("Please enter email");

      const res = await generate(email);
      console.log("API Response:", res);

      if (res?.message === "OTP sent to mail") {
        setTimeLeft(600);
        setIsRunning(true);
        setotpSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async () => {
    try {
      const res = await verify(email, otp);
      console.log(res);

      if (res?.message === "Email verification complete") {
        navigate("/register", { state: { email } });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Verify your email
          </h2>

          {!isRunning ? (
            <p className="text-sm text-gray-500 mt-1">
              We’ll send a verification code to your email
            </p>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              OTP sent to{" "}
              <span className="font-medium text-gray-900">{email}</span>
            </p>
          )}
        </div>

        {/* Email Input + Generate Button */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Email address
          </label>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isRunning}
              className="w-full h-12 px-4 pr-36 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          disabled:bg-gray-100 disabled:text-gray-500 transition"
            />

            <button
              type="button"
              onClick={handleGenerate}
              disabled={isRunning || otpSent || !email}
              className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-9 px-4 rounded-md text-sm font-medium transition
          ${
            isRunning || otpSent
              ? "text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
          }`}
            >
              {isRunning ? formatTime(timeLeft) : "Send OTP"}
            </button>
          </div>

          {/* Timer / Info */}
          {isRunning && (
            <p className="text-xs text-gray-500">
              Code expires in {formatTime(timeLeft)}
            </p>
          )}
        </div>

        {/* OTP Section */}
        {otpSent && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Verification code
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                maxLength={6}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg text-center tracking-widest text-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg 
          hover:bg-blue-700 transition shadow-sm"
            >
              Verify Email
            </button>

            {/* Resend */}
            {!isRunning && (
              <p className="text-sm text-center text-gray-500">
                Didn’t receive the code?{" "}
                <button
                  onClick={handleGenerate}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Resend OTP
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Verification;
