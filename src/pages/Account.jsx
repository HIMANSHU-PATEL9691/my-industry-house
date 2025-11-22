import React, { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";

export default function Register() {
  const [role, setRole] = useState("buyer");

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl p-8 md:p-12 border border-yellow-200">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif text-[#6b4f22] text-center">
          Your B2B Growth Partner
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Connect with a nationwide network of verified suppliers and buyers.
          Streamline your procurement and expand your market reach with us.
        </p>

        {/* Create Account */}
        <h3 className="text-2xl font-semibold text-center text-[#6b4f22] mt-8">
          Create Your Account
        </h3>
        <p className="text-gray-500 text-center">Join the leading B2B marketplace today.</p>

        {/* Register As */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setRole("buyer")}
            className={`px-6 py-2 rounded-full border 
              ${role === "buyer" ? "bg-yellow-400 text-white border-yellow-400" : "border-yellow-300 text-[#6b4f22]"}
            `}
          >
            Buyer
          </button>

          <button
            onClick={() => setRole("seller")}
            className={`px-6 py-2 rounded-full border 
              ${role === "seller" ? "bg-yellow-400 text-white border-yellow-400" : "border-yellow-300 text-[#6b4f22]"}
            `}
          >
            Seller
          </button>
        </div>

        {/* Form */}
        <form className="mt-10 space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-[#6b4f22]">Full Name</label>
            <div className="flex items-center border border-yellow-300 rounded-xl p-3 bg-[#fffdf6] mt-1">
              <FiUser className="text-gray-400 text-lg mr-3" />
              <input
                type="text"
                placeholder="e.g., Priya Sharma"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#6b4f22]">Email Address</label>
            <div className="flex items-center border border-yellow-300 rounded-xl p-3 bg-[#fffdf6] mt-1">
              <FiMail className="text-gray-400 text-lg mr-3" />
              <input
                type="email"
                placeholder="himanshupatel@digitalflyhigh.in"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <label className="text-sm font-medium text-[#6b4f22]">Contact Number</label>
            <div className="flex items-center border border-yellow-300 rounded-xl p-3 bg-[#fffdf6] mt-1">
              <FiPhone className="text-gray-400 text-lg mr-3" />
              <input
                type="tel"
                placeholder="e.g., 9876543210"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#6b4f22]">Password</label>
            <div className="flex items-center border border-yellow-300 rounded-xl p-3 bg-[#fffdf6] mt-1">
              <FiLock className="text-gray-400 text-lg mr-3" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>


          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-[#6b4f22]">Confirm Password</label>
            <div className="flex items-center border border-yellow-300 rounded-xl p-3 bg-[#fffdf6] mt-1">
              <FiLock className="text-gray-400 text-lg mr-3" />
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full outline-none bg-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-white font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
          >
            Create Account
          </button>
        </form>

        {/* Already Have Account */}
        <p className="text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-600 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
