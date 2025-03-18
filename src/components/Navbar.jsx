import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // ✅ Get cart items from Redux
  const cart = useSelector((state) => state.cart.cartItems);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setIsScrollingUp(currentScrollPosition < lastScrollPosition);
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPosition]);

  return (
    <nav
      className={`w-full fixed top-[40px] left-0 z-50 transition-all duration-300 ${
        isScrollingUp || isHovered ? "bg-white" : "bg-transparent"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center py-3 transition-colors duration-300">
        
        {/* ✅ Left: Logo (Independent) */}
        <div className="absolute left-12">
          <Logo />
        </div>

        {/* ✅ Center: Categories (Independent) */}
        <div className="flex-1 flex justify-center">
          <Categories />
        </div>

        {/* ✅ Search Bar (Independent) */}
        <div className="flex items-center w-auto">
          <SearchBar />
        </div>

        {/* ✅ Right: Wishlist & Cart (Independent, Aligned to Right) */}
        <div className="absolute right-12 flex items-center space-x-6">
          <Link to="/wishlist" className="relative">
            <HeartIcon className="w-7 h-7 text-black hover:text-gray-600 transition duration-300" />
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingCartIcon className="w-7 h-7 text-black hover:text-gray-600 transition duration-300" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
