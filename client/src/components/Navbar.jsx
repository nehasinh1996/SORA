import React from "react";
import Logo from "./Logo";
import Categories from "./Categories"; // ✅ Display categories in the navbar

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-3">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Categories Section - Centered */}
        <div className="flex-1 flex justify-center">
          <Categories /> {/* ✅ Displays categories for navigation */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;