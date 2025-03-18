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
  selectedCategory: localStorage.getItem("selectedCategory") || null,
  selectedSubcategory: localStorage.getItem("selectedSubcategory") || null,
  products: [],
  selectedProduct: null, // Added for single product details
  status: "idle",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      localStorage.setItem("selectedCategory", action.payload);
      state.selectedSubcategory = null;
      localStorage.removeItem("selectedSubcategory");
      const category = state.categories.find(
        (cat) => cat.category_name === action.payload
      );
      state.products = category
        ? category.subcategories.flatMap((sub) => sub.products)
        : [];
    },
    setSubcategory: (state, action) => {
      state.selectedSubcategory = action.payload;
      localStorage.setItem("selectedSubcategory", action.payload);
      const category = state.categories.find(
        (cat) => cat.category_name === state.selectedCategory
      );
      const subcategory = category?.subcategories.find(
        (sub) => sub.subcategory_name === action.payload
      );
      state.products = subcategory ? subcategory.products : [];
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

        if (state.selectedCategory) {
          const category = state.categories.find(
            (cat) => cat.category_name === state.selectedCategory
          );
          state.products = category
            ? category.subcategories.flatMap((sub) => sub.products)
            : [];
        }

        if (state.selectedSubcategory) {
          const category = state.categories.find(
            (cat) => cat.category_name === state.selectedCategory
          );
          const subcategory = category?.subcategories.find(
            (sub) => sub.subcategory_name === state.selectedSubcategory
          );
          state.products = subcategory ? subcategory.products : [];
        }
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.status = "failed";
        state.selectedProduct = null;
      });
  },
});

export const { setCategory, setSubcategory } = productsSlice.actions;
export default productsSlice.reducer;