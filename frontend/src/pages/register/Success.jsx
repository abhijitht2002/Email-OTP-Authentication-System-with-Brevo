import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-gray-100 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900">
          Account Created Successfully 🎉
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">
          Your account has been created and verified.
        </p>

        {/* Info */}
        <p className="text-sm text-gray-400 mt-4">
          Redirecting you in 5 seconds...
        </p>

        {/* Manual Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full h-12 bg-blue-600 text-white font-semibold rounded-lg 
          hover:bg-blue-700 transition shadow-sm"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}

export default Success;
