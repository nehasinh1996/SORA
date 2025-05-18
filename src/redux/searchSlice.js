import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch search results
export const fetchSearchResults = createAsyncThunk(
  "search/fetchResults",
  async (query) => {
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    return data;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    searchResults: [],
    isLoading: false,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSearchResults.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

export default searchSlice.reducer;
