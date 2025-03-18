import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

// Import Components
import Layout from "./components/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import NotFound from "./NotFound";

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
        <Routes>
          {/* ✅ Public Routes (With Layout) */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/category/:categoryName" element={<Layout><ProductPage /></Layout>} />
          <Route path="/category/:categoryName/:subCategoryName" element={<Layout><ProductPage /></Layout>} />
          <Route path="/category/:categoryName/:subCategoryName/product/:productName" element={<Layout><ProductPage /></Layout>} />
          <Route path="/product/:productId" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/products/:productName" element={<Layout><ProductPage /></Layout>} />
          <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
          <Route path="/contact-us" element={<Layout><ContactUs /></Layout>} />
          
          {/* ✅ Public Routes for Viewing Wishlist & Cart */}
          <Route path="/wishlist" element={<Layout><WishlistPage /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          
          {/* ✅ Protected Routes (Only for Logged-in Users) */}
          <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Layout><Orders /></Layout></ProtectedRoute>} />
          <Route path="/orders/:orderId" element={<ProtectedRoute><Layout><OrderDetail /></Layout></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Layout><Checkout /></Layout></ProtectedRoute>} />
          <Route path="/place-order" element={<ProtectedRoute><Layout><PlaceOrder /></Layout></ProtectedRoute>} />
          <Route path="/order-success" element={<ProtectedRoute><Layout><OrderSuccess /></Layout></ProtectedRoute>} />

          {/* ✅ Policy Pages (Public, No Layout) */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/return-and-cancellation-policy" element={<ReturnAndCancellationPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          {/* ❌ Auth Pages (Public, No Layout) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />

          {/* ✅ Catch all 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;