import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to fetch banner data
export const fetchBanners = createAsyncThunk("banners/fetchBanners", async () => {
  const response = await fetch("/data/banner.json"); // ✅ Correct Fetch Path
  const data = await response.json();
  return data.banners; // ✅ Extract banners correctly
});

const bannerSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    selectedBanner: null, // ✅ Store the selected banner here
    loading: false,
    error: null
  },
  reducers: {
    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// ✅ Export the action
export const { setSelectedBanner } = bannerSlice.actions;

export default bannerSlice.reducer;
