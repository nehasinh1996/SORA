import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Logo = ({ className = "" }) => {
  const logoUrl = "https://res.cloudinary.com/df86jjkhb/image/upload/v1741445908/Sora_hhwddk.png";

  return (
    <nav className="w-full">
      <div className="container mx-auto flex items-left justify-between">
        <div className="flex items-center">
          <Link to="/" className={`flex items-center ${className}`}>
            <img src={logoUrl} alt="Logo" className="h-10 w-auto cursor-pointer" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Define PropTypes
Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
