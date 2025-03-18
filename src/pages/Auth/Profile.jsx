import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { updateUser } from "../../redux/authSlice"; // Assuming authSlice handles user data

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const user = useSelector((state) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    bio: "Welcome to my profile!",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if not logged in
      return;
    }
    setUserData({
      name: user.name || "",
      phone: user.phone || "",
      email: user.email || "",
      bio: user.bio || "Welcome to my profile!",
    });
  }, [user, navigate]);

  const handleEdit = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/profile`,
        userData,
        { withCredentials: true }
      );

      dispatch(updateUser(res.data)); // Update Redux store
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</h2>

        {/* Profile Details */}
        <div className="space-y-4">
          {["name", "phone", "bio"].map((field) => (
            <div key={field}>
              <label className="text-gray-600 font-medium capitalize">{field}</label>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={userData[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
                />
              ) : (
                <p className="p-2 border border-gray-300 rounded-md">{userData[field]}</p>
              )}
            </div>
          ))}

          {/* Email (Non-editable) */}
          <div>
            <label className="text-gray-600 font-medium">Email</label>
            <p className="p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed">
              {userData.email}
            </p>
          </div>

          {/* Edit & Save Buttons */}
          <div className="flex justify-center gap-4">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700 transition"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
