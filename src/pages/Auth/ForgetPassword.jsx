import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.includes("@")) {
      return setError("Enter a valid email address.");
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/forgot-password", { email });

      if (res.data.success) {
        setMessage("Password reset link sent to your email.");
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (  
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden w-[50%] md:flex">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center h-120">
          <img src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741445877/forget_mqcmto.jpg" alt="Forgot Password" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 pt-26">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Forgot Password</h2>
          <p className="text-gray-600 text-sm mb-6">Enter your email and we will send you a reset link.</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
              disabled={loading}
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600 text-sm">
            <button onClick={() => navigate("/login")} className="hover:underline cursor-pointer">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;