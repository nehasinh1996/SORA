import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false; // Replace this with actual authentication logic

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Add PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
