import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null, // No default category
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      console.log("Category updated to:", action.payload);
      state.selectedCategory = action.payload;
    },
    resetCategory: (state) => {
      state.selectedCategory = null;
    },
  },
});

export const { setCategory, resetCategory } = categorySlice.actions;
export default categorySlice.reducer;
