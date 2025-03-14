import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/productsSlice";
import bannerReducer from "./bannerSlice"


const store = configureStore({
  reducer: {
    products: productsReducer,
    banners: bannerReducer,
  },
});

export default store;