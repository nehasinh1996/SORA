import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { name, phone, email, password } = formData;

    // 🛑 Frontend Validation
    if (!name || !phone || !email || !password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validatePhone(phone)) {
      setError("Enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      console.log("🟢 Sending Signup Request:", formData);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        formData,
        { withCredentials: true } // Backend se cookies handle karne ke liye
      );

      console.log("✅ Signup Response:", res.data);
      setSuccess("Account created successfully! Redirecting...");
      
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("❌ Signup Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
      <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden w-[50%] md:flex">
        <div className="hidden md:block md:w-1/2 bg-cover bg-center">
          <img src="signup.jpeg" alt="Sign Up" className="w-full h-full object-cover" />
        </div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Create Account</h2>
          <p className="text-gray-600 text-sm mb-6">Join us on your skincare journey!</p>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter Your Name"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter Your Number"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Email"
            />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Password"
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition duration-300 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <NavLink to="/login" className="text-black font-semibold hover:underline">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
