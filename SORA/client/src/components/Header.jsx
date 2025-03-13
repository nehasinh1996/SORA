import React from "react";
import Navbar from "./Navbar"; // Import Navbar
import DynamicBanner from "./DynamicBanner"; // Import DynamicBanner

const Header = () => {
  return (
    <header className="w-full">

       {/* Dynamic Banner below Navbar */}
       <DynamicBanner />
       
      {/* Navbar with Logo inside */}
      <Navbar />

     
    </header>
  );
};

export default Header;
