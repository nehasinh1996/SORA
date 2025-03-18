import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortBy: localStorage.getItem("sortBy") || "recommended",
};

const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case "low-high":
      return [...products].sort((a, b) => a.price - b.price);
    case "high-low":
      return [...products].sort((a, b) => b.price - a.price);
    case "new-arrival":
      return [...products].sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
    case "best-selling":
      return [...products].sort((a, b) => b.sales - a.sales);
    case "recommended":
    default:
      return [...products];
  }
};

const sortBySlice = createSlice({
  name: "sortBy",
  initialState,
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      localStorage.setItem("sortBy", action.payload);
    },
  },
});

export const { setSortBy } = sortBySlice.actions;
export default sortBySlice.reducer;
export { sortProducts };
