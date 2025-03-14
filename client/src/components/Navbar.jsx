import React from "react";
import Logo from "./Logo";
<<<<<<< HEAD
import Categories from "./Categories"; // ✅ Displays categories in the navbar
import SearchBar from "./SearchBar";
=======
import Categories from "./Categories"; // ✅ Display categories in the navbar
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-3">
<<<<<<< HEAD
      <div className="container mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-x-4 px-4">
=======
      <div className="container mx-auto flex items-center justify-between">
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
        {/* Logo Section */}
        <div className="flex items-center">
          <Logo />
        </div>

<<<<<<< HEAD
        {/* Categories Section - Centered (Hidden on Small Screens) */}
        <div className="hidden md:flex flex-1 justify-center">
          <Categories />
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-auto flex justify-center md:justify-end mt-2 md:mt-0">
          <SearchBar />
=======
        {/* Categories Section - Centered */}
        <div className="flex-1 flex justify-center">
          <Categories /> {/* ✅ Displays categories for navigation */}
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
        </div>
      </div>
    </nav>
  );
};

<<<<<<< HEAD
export default Navbar;
=======
export default Navbar;
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
