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
            state.filters = { concerns: [], treatment_type: [], ingredients: [] };
            localStorage.removeItem("filters");
          },
          
            setFilters: (state, action) => {
            state.filters = action.payload;
          },
    clearFilters: (state) => {
      state.filters = { concerns: [], treatment_type: [], ingredients: [] };
    },
  },
});

export const { setCategory, setSubcategory, setProduct, setFilters, clearFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
