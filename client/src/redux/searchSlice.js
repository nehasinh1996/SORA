import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Initial State
const initialState = {
  searchQuery: "",
  searchResults: [],
  loading: false,
  error: null,
};

// ✅ Fetch Search Results
export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch("/data/product.json");
      const data = await response.json();

      // Flatten and filter products based on query
      const matchedProducts = data.categories.flatMap((category) =>
        category.subcategories.flatMap((sub) =>
          sub.products.filter((product) =>
            product.product_name.toLowerCase().includes(query.toLowerCase())
          )
        )
      );

      return matchedProducts;
    } catch (error) {
      console.error("Search fetch error:", error);
      return rejectWithValue("Error fetching search results.");
    }
    
  }
);

// ✅ Search Slice
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ✅ Export actions
export const { setSearchQuery, clearSearch } = searchSlice.actions;

// ✅ Export reducer
export default searchSlice.reducer;
