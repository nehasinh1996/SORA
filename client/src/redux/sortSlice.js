import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sortOption: "relevance", // Default sorting option
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    resetSortOption: (state) => {
      state.sortOption = "relevance"; // Reset to default
    },
  },
});

export const { setSortOption, resetSortOption } = sortSlice.actions;
export default sortSlice.reducer;
