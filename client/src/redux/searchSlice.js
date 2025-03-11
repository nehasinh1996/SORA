import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch search suggestions dynamically
export const fetchSuggestions = createAsyncThunk(
  "search/fetchSuggestions",
  async (query, { rejectWithValue }) => {
    try {
      if (!query.trim()) return []; // Prevent empty queries
      const response = await fetch(`/api/search?q=${query}`); // Example API endpoint
      const data = await response.json();
      return data.suggestions; // Adjust based on API response structure
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    suggestions: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuggestions.pending, (state) => {
        state.status = "loading";
        state.suggestions = [];
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suggestions = action.payload;
      })
      .addCase(fetchSuggestions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// ✅ Export Actions
export const { setQuery, clearSuggestions } = searchSlice.actions;

// ✅ Export Reducer
export default searchSlice.reducer;
