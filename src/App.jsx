import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import NotFound from "./NotFound";
import Home from "./Home";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductPage/ProductDetail";
import AboutUs from "./About";
import Footer from "./components/Footer";
import ContactUs from "./ContactUs";

// ✅ Import Policy Pages
import PrivacyPolicy from "./pages/Policies/PrivacyPolicy";
import RefundPolicy from "./pages/Policies/RefundPolicy";
import ReturnAndCancellationPolicy from "./pages/Policies/ReturnAndCancellationPolicy";
import TermsOfService from "./pages/Policies/TermsOfService";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* ✅ Existing Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<ProductPage />} />
          <Route path="/category/:categoryName/:subCategoryName" element={<ProductPage />} />
          <Route path="/category/:categoryName/:subCategoryName/product/:productName" element={<ProductPage />} />
          <Route path="/product/:productId" element={<ProductDetail />} />

          {/* ✅ Add Missing Footer Routes */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/return-and-cancellation-policy" element={<ReturnAndCancellationPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />

          {/* ✅ Catch all 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
