import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import products from "../data/products"; // Import JSON data

// ✅ Async thunk to fetch category names from products
export const fetchDropdownData = createAsyncThunk("dropdown/fetchData", async (_, { rejectWithValue }) => {
  try {
    if (!Array.isArray(products)) {
      throw new Error("Invalid product data format");
    }

    const categories = {};

    products.forEach((product) => {
      if (!product?.category || !product?.name) return; // Ensure valid data

      if (!categories[product.category]) {
        categories[product.category] = new Set();
      }
      categories[product.category].add(product.name);
    });

    // Convert Sets to Arrays for Redux storage
    const formattedData = Object.entries(categories).map(([category, names]) => ({
      title: category,
      items: Array.from(names).map((name) => ({
        name,
        path: `/${category.toLowerCase()}/${name.toLowerCase().replace(/\s+/g, "-")}`,
      })),
    }));

    return formattedData;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// ✅ Create slice
const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    categories: [],
    status: "idle",
    error: null, // Store error messages
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDropdownData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDropdownData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchDropdownData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default dropdownSlice.reducer;
