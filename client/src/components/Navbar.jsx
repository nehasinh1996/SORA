import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import Categories from "./Categories";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full fixed top-[40px] left-0 transition-all duration-300 z-50 
        ${isHovered || isScrolledUp ? "bg-white shadow-md" : "bg-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto flex items-center justify-between py-3">
        {/* Logo Section */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Categories Section */}
        <div className="flex-1 flex justify-center">
          <Categories />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
