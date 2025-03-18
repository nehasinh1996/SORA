import Navbar from "./Navbar";
import DynamicBanner from "./DynamicBanner";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      
      
        <DynamicBanner />
        <Navbar />
     
    </header>
  );
};

export default Header;