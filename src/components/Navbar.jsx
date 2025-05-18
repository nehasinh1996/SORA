import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HeartIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Logo from "./Logo";
import Categories from "./Categories";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  //  Get cart items from Redux
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
      className={`w-full fixed top-[40px] left-0 z-100 border-b border-gray-300 transition-all duration-300 ${
        isScrollingUp || isHovered ? "bg-white" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        
        {/*  Left: Logo (Independent) */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/*  Center: Categories (Independent) */}
        <div className="flex-1 flex justify-center">
          <Categories />
        </div>

        {/*  Search Bar (Independent) */}
        <div className="flex items-center w-auto">
          <SearchBar />
        </div>

        {/*  User Profile Icon */}
        <div className="ml-4">
          <Link to="/profile" title="Profile">
            <UserCircleIcon className="w-8 h-8 text-black hover:text-gray-600 transition duration-300" />
          </Link>
        </div>

        {/*  Right: Wishlist & Cart (Independent, Aligned to Right) */}
        {/* Right: Wishlist & Cart (Independent, Aligned to Right) */}
<div className="absolute right-4 sm:right-8 md:right-12 flex items-center gap-4 sm:gap-6 flex-wrap">
  <Link to="/wishlist" title="Wishlist" className="relative">
    <HeartIcon className="w-6 h-6 sm:w-7 sm:h-7 text-black hover:text-gray-600 transition duration-300" />
  </Link>
  <Link to="/cart" title="Cart" className="relative">
    <ShoppingCartIcon className="w-6 h-6 sm:w-7 sm:h-7 text-black hover:text-gray-600 transition duration-300" />
    {cartItemCount > 0 && (
      <span className="absolute -top-1 -right-1 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full">
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
