import React, { useState } from "react";
import Logo from "./Logo";
import Categories from "./Categories";

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav
      className={`w-full fixed top-[40px] left-0 z-50 transition-all duration-300
        ${isHovered ? "bg-white" : "bg-transparent"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto flex items-center justify-between py-3 transition-colors duration-300">
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
