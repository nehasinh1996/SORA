import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import DynamicBanner from "./DynamicBanner";

const Header = () => {
  const [bannerPosition, setBannerPosition] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY) {
        setBannerPosition(-40); // Moves up slightly when scrolling up
      } else {
        setBannerPosition(0); // Moves down when scrolling down
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header className="w-full fixed top-0 left-0 z-50 transition-all duration-300">
      {/* Dynamic Banner - Adjusted positioning */}
      <div
        className="w-full bg-black text-white text-center py-2 text-sm font-medium transition-transform duration-300"
        style={{ transform: `translateY(${bannerPosition}px)` }}
      >
        <DynamicBanner />
      </div>

      {/* Navbar should stay fixed at the top */}
      <Navbar />
    </header>
  );
};

export default Header;
