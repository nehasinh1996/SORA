// ✅ getFiltersForCategory: Improved Edge Case Handling
export const getFiltersForCategory = (category, allProducts) => {
  if (!category || !Array.isArray(allProducts) || allProducts.length === 0) {
    return { concerns: [], treatment_type: [], ingredients: [] };
  }

  const categoryProducts = allProducts.filter(product => product.category === category);

  return {
    concerns: [...new Set(categoryProducts.flatMap(product => product.concerns || []))],
    treatment_type: [...new Set(categoryProducts.flatMap(product => product.treatment_type || []))],
    ingredients: [...new Set(categoryProducts.flatMap(product => product.ingredients || []))],
  };
};

// ✅ filterSlice.js - Improved `toggleFilter`
import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    selectedCategory: null,
    availableFilters: {},
    selectedFilters: {},
  },
  reducers: {
    setFilters: (state, action) => {
      state.availableFilters = action.payload;
    },
    toggleFilter: (state, action) => {
      const { filterType, value } = action.payload;
      const currentValues = state.selectedFilters[filterType] || [];

      // ✅ Immutable update using `filter()` instead of `splice()`
      if (currentValues.includes(value)) {
        state.selectedFilters[filterType] = currentValues.filter(item => item !== value);
      } else {
        state.selectedFilters[filterType] = [...currentValues, value];
      }

      // ✅ Remove empty filterType to keep state clean
      if (state.selectedFilters[filterType].length === 0) {
        delete state.selectedFilters[filterType];
      }
    },
    resetFilters: (state) => {
      state.selectedFilters = {};
    },
  },
});

export const { setFilters, toggleFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
