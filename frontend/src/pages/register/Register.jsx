import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { register } from "./auth.api";

function Register() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [formData, setFormdata] = useState({
    name: "",
    email: email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Create clicked");
    try {
      const res = await register(formData);
      console.log(res);

      if (res?.message === "Account created successfully") {
        navigate("/register-success");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Complete your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Set your name and password to finish signup
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Email (Verified & Disabled) */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full h-12 px-4 border border-gray-200 rounded-lg 
          bg-gray-100 text-gray-500 cursor-not-allowed"
            />
            <p className="text-xs text-green-600">✓ Email verified</p>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <p className="text-xs text-gray-500">
              Must be at least 8 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-blue-600 text-white font-semibold rounded-lg 
        hover:bg-blue-700 transition shadow-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
