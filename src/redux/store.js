import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import bannerReducer from "./bannerSlice";
import filterReducer from "./filterSlice";
import sortByReducer from "./sortby";
import wishlistReducer from "./wishlistSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice"; 
import searchReducer from "./searchSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    banners: bannerReducer,
    filter: filterReducer,
    sortBy: sortByReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
    auth: authReducer, 
    search: searchReducer,
  },
  devTools: import.meta.env.MODE !== "production",

});

export default store;
