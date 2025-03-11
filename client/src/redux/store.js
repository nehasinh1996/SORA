import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import searchReducer from "../redux/searchSlice";
import filterReducer from "../redux/filterSlice";
import categoryReducer from "../redux/categorySlice";
import dropdownReducer from "../redux/dropdownSlice";
import sortReducer from "../redux/sortSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchReducer,
    filters: filterReducer,
    category: categoryReducer,
    dropdown: dropdownReducer,
    sort: sortReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

export default store;
