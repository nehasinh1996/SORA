import React, { useState } from "react";
import axios from "axios";

const OtpVerification = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const handleSendOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/send-otp", { phone, email });
      alert(res.data.message);
      setStep(2);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp });
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-[50%] p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">OTP Verification</h2>

        {step === 1 ? (
          <>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button onClick={handleSendOtp} className="w-full bg-black text-white p-3 rounded-lg">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp} className="w-full bg-black text-white p-3 rounded-lg">
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
