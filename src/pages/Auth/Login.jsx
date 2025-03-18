import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    const result = await dispatch(loginUser({ email, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden w-[50%] md:flex">
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-cover bg-center">
          <img src="login.jpeg" alt="Login" className="w-full h-full object-cover" />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
          <p className="text-gray-600 text-sm mb-6">Let&#39;s get started with your skincare journey!</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {status === "succeeded" && (
            <p className="text-green-500 text-sm mb-4">Login successful! Redirecting...</p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your password"
              required
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full bg-black text-white p-3 rounded-lg transition-all duration-300 hover:bg-gray-800 ${
                status === "loading" ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4 text-gray-600 text-sm">
            <NavLink to="/forgetPassword" className="hover:underline">Forgot your password?</NavLink>
          </div>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don&#39;t have an account? <NavLink to="/signUp" className="text-black font-semibold hover:underline">Sign Up</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;