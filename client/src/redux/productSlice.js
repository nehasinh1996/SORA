import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsData from "../data/products"; // Import local product data

// ✅ Async thunk to fetch products dynamically (optional)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("/api/products"); // Example API endpoint
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: productsData, // Load from local JSON initially
    status: "idle", // Track API status: idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Export Actions
export const { setProducts } = productSlice.actions;

// ✅ Export Reducer
export default productSlice.reducer;
