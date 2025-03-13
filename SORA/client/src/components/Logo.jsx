import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ className = "" }) => {
  // Define logo URL inside the component
  const logoUrl = "https://res.cloudinary.com/df86jjkhb/image/upload/v1741445908/Sora_hhwddk.png";

  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-left justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/" className={`flex items-center ${className}`}>
            <img src={logoUrl} alt="Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Logo;
