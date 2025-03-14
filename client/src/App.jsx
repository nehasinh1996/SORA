import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import NotFound from "./NotFound";
import Home from "./Home";
import ProductPage from "./pages/ProductPage/ProductPage"; // ✅ Handles Category, Subcategory & Products
import ProductDetail from "./pages/ProductPage/ProductDetail";
import DynamicBanner from "./components/DynamicBanner";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DynamicBanner/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<ProductPage />} /> 
          <Route path="/category/:categoryName/:subCategoryName" element={<ProductPage />} /> 
          <Route path="/category/:categoryName/:subCategoryName/product/:productName" element={<ProductPage />} />{/* ✅ Product by name */}
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
