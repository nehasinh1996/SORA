import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import NotFound from "./NotFound";
import Header from "./components/Header";
import Home from "./Home";
import ProductPage from "./pages/ProductPage/ProductPage"; // ✅ Handles Category, Subcategory & Products
import ProductDetail from "./pages/ProductPage/ProductDetail";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<ProductPage />} /> 
          <Route path="/category/:categoryName/:subCategoryName" element={<ProductPage />} /> 
          <Route path="/category/:categoryName/:subCategoryName/product/:productName" element={<ProductPage />} />{/* ✅ Product by name */}
          <Route path="/product/:productId" element={<ProductDetail />} />
<<<<<<< HEAD
          <Route path="/product/:productId" element={<ProductDetail />} />
=======
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
