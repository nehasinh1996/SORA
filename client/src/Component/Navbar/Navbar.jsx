import React, { useState, useRef, useEffect, useCallback } from "react";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../../Pages/Cart/Cart";
import ProfileMenu from "../../Pages/Profile/ProfileMenu";
import DropdownMenu from "./DropdownMenu";
import SearchBar from "../SearchBar/SearchBar";
import useStore from "../../Context/StoreContext";
import { fetchDropdownData } from "../../redux/dropdownSlice";

const Navbar = () => {
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { categories, status } = useSelector((state) => state.dropdown);

  useEffect(() => {
    if (status === "idle" && categories.length === 0) {
      dispatch(fetchDropdownData());
    }
  }, [dispatch, status, categories.length]);

  const { cart } = useStore();
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Click outside close logic
  const handleClickOutside = useCallback((event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      setShowCart(false);
    }
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfile(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWishlistClick = () => {
    navigate("/wishlist");
  };

  return (
    <nav className="fixed top-0 left-0 w-full mt-10 bg-white/30 backdrop-blur-lg shadow-md z-50 hover:bg-white transition">
      <div className="flex justify-between items-center px-6 sm:px-10 py-3">
        <img
          className="h-10 sm:h-12 cursor-pointer"
          src="/Sora.png"
          alt="Sora Company Logo - Click to go Home"
          onClick={handleLogoClick}
        />

        <ul className="hidden sm:flex gap-6 lg:gap-10">
          {categories.map((category) => (
            <li key={category.title} className="relative group">
              <DropdownMenu
                title={category.title}
                mainPath={category.mainPath}
                items={category.items}
              />
              <span className="absolute left-0 bottom-[-2px] w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        <div className="flex gap-5 sm:gap-7 relative items-center">
          <SearchBar />
          <FaHeart
            className="text-lg sm:text-xl cursor-pointer hover:text-gray-700 transition"
            onClick={handleWishlistClick}
          />

          <div className="relative" ref={cartRef}>
            <FaShoppingCart
              className="text-lg sm:text-xl cursor-pointer hover:text-gray-700 transition"
              onClick={() => setShowCart((prev) => !prev)}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
            {showCart && (
              <div className="absolute right-0 mt-2 w-64 sm:w-80 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                <Cart />
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <FaUser
              className="text-lg sm:text-xl cursor-pointer hover:text-gray-500 transition"
              onClick={() => setShowProfile((prev) => !prev)}
            />
            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white p-3 sm:p-4 rounded-lg shadow-md">
                <ProfileMenu onClose={() => setShowProfile(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
