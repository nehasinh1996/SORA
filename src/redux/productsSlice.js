import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch categories from JSON
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("/data/product.json");
  const data = await response.json();
  return data.categories;
});

// Fetch a single product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const response = await fetch("/data/product.json");
    const data = await response.json();

    for (const category of data.categories) {
      for (const subcategory of category.subcategories) {
        const product = subcategory.products.find((p) => p.id === productId);
        if (product) {
          return {
            ...product,
            category_name: category.category_name, // Include Category
            subcategory_name: subcategory.subcategory_name, // Include Subcategory
          };
        }
      }
    }

    throw new Error("Product not found");
  }
);

const initialState = {
  categories: [],
  selectedCategory: null,
  selectedSubcategory: null,
  products: [],
  selectedProduct: null, // Added for single product details
  sortBy: localStorage.getItem("sortBy") || "recommended", // Persist sort selection
  status: "idle",
};

const sortProducts = (products, sortBy) => {
  switch (sortBy) {
    case "low-high":
      return [...products].sort((a, b) => a.price - b.price);
    case "high-low":
      return [...products].sort((a, b) => b.price - a.price);
    case "new-arrival":
      return [...products].sort((a, b) => new Date(b.date) - new Date(a.date));
    case "best-selling":
      return [...products].sort((a, b) => b.sold - a.sold);
    case "recommended":
    default:
      return products;
  }
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      const category = state.categories.find(
        (cat) => cat.category_name === action.payload
      );
      state.products = category
        ? sortProducts(category.subcategories.flatMap((sub) => sub.products), state.sortBy)
        : [];
    },
    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
      const category = state.categories.find(
        (cat) => cat.category_name === state.selectedCategory
      );
      const subcategory = category?.subcategories.find(
        (sub) => sub.subcategory_name === action.payload
      );
      state.products = subcategory ? sortProducts(subcategory.products, state.sortBy) : [];
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      localStorage.setItem("sortBy", action.payload);
      state.products = sortProducts(state.products, state.sortBy);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload; // Store fetched product
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
        state.selectedProduct = null;
      });
  },
});

export const { setCategory, setSubcategory, setSortBy } = productsSlice.actions;
export default productsSlice.reducer;
