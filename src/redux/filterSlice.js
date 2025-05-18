import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: null,
  selectedSubcategory: null,
  selectedProduct: null,
  filters: {
    concerns: [],
    treatment_type: [],
    ingredients: [],
  },
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubcategory = null;
      state.selectedProduct = null;
      state.filters = { concerns: [], treatment_type: [], ingredients: [] };
      localStorage.removeItem("filters");
    },

    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
      state.selectedProduct = null;
      state.filters = { concerns: [], treatment_type: [], ingredients: [] };
      localStorage.removeItem("filters");
    },

    setProduct: (state, action) => {
      state.selectedProduct = action.payload;
      state.selectedSubcategory = null;  // Ensure subcategory is cleared
      state.filters = {
        concerns: action.payload.concerns || [],
        treatment_type: action.payload.treatment_type || [],
        ingredients: action.payload.ingredients || [],
      };  // Set product-specific filters
      localStorage.removeItem("filters");
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
    },

    clearFilters: (state) => {
      state.filters = { concerns: [], treatment_type: [], ingredients: [] };
    },

    setFiltersFromLocalStorage: (state, action) => {
      state.filters = action.payload;
    },
    
  },
});

export const {
  setCategory,
  setSubcategory,
  setProduct,
  setFilters,
  clearFilters,
  setFiltersFromLocalStorage,
} = filterSlice.actions;

export default filterSlice.reducer;
