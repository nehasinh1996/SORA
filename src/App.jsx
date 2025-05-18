import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import Components
import Layout from "./components/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./NotFound";
import SearchBar from "./components/SearchBar"; // Make sure SearchBar is imported

// Public Pages
import Home from "./Home";
import AboutUs from "./About";
import ContactUs from "./ContactUs";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductPage/ProductDetail";

// Authentication Pages
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import OtpVerification from "./pages/Auth/OtpVerification";

// Policy Pages
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import RefundPolicy from "./pages/Policies/RefundPolicy";
import ReturnAndCancellationPolicy from "./pages/Policies/ReturnAndCancellationPolicy";
import TermsOfService from "./pages/Policies/TermsOfService";

// Order Pages
import Orders from "./pages/Orders/Orders";
import OrderDetail from "./pages/Orders/OrderDetail";
import Checkout from "./pages/Orders/Checkout";
import PlaceOrder from "./pages/Orders/PlaceOrder";
import OrderSuccess from "./pages/Orders/OrderSuccess";

// User Pages
import WishlistPage from "./pages/ProductPage/WishlistPage";
import Cart from "./pages/ProductPage/Cart";
import Profile from "./pages/Auth/Profile";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>

          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryName" element={<ProductPage />} />
            <Route path="/category/:categoryName/:subCategoryName" element={<ProductPage />} />
            <Route path="/category/:categoryName/:subCategoryName/product/:productName" element={<ProductPage />} />
            <Route path="/products/:productName" element={<ProductPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/cart" element={<Cart />} />

            {/* Protected Routes */}
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
            <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/place-order" element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
            <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />

            {/* Policy Pages */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/return-and-cancellation-policy" element={<ReturnAndCancellationPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* Auth Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="forgetPassword" element={<ForgetPassword />} />
            <Route path="/otp-verification" element={<OtpVerification />} />

            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
