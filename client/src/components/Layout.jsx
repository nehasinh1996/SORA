import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header /> {/* Includes OfferBanner + Navbar */}
      {children}
      <Footer />
    </>
  );
};

// ✅ Add PropTypes validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
