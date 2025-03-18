import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import { sortProducts } from "../../redux/sortby";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import SortBy from "../../components/SortBy";
import FilterSidebar from "../../components/FilterSidebar";
import { setFilters, clearFilters } from "../../redux/filterSlice";

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const sortBy = useSelector((state) => state.sortBy.sortBy);
  const filters = useSelector((state) => state.filter.filters);

  // ✅ Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // ✅ Reset filters and sort on category, subcategory, or product change
  useEffect(() => {
    dispatch(clearFilters());
    localStorage.removeItem("filters");

    if (categoryName) dispatch(setCategory(categoryName));
    if (subCategoryName) dispatch(setSubcategory(subCategoryName));
  }, [categoryName, subCategoryName, productName, dispatch]);

  useEffect(() => {
    dispatch(setFilters(filters));
  }, [filters, dispatch]);

  // ✅ Apply filters to products
  const filteredProducts = products.filter((product) => {
    const matchesConcerns =
      filters.concerns.length === 0 || filters.concerns.some((concern) => product.concerns.includes(concern));

    const matchesTreatmentType =
      filters.treatment_type.length === 0 ||
      filters.treatment_type.some((type) => product.treatment_type.includes(type));

    const matchesIngredients =
      filters.ingredients.length === 0 ||
      filters.ingredients.some((ingredient) => product.ingredients.includes(ingredient));

    return matchesConcerns && matchesTreatmentType && matchesIngredients;
  });

  const displayedProducts = productName
    ? filteredProducts.filter(
        (p) =>
          p.product_name.toLowerCase().replace(/\s+/g, "-") ===
          productName.toLowerCase().replace(/\s+/g, "-")
      )
    : sortProducts(filteredProducts, sortBy);

  return (
    <>
      <Header />
      <Banner />

      {/* ✅ Filter and Sort section just below the banner */}
      <div className="relative flex items-center justify-end px-2 py-3 border-b border-gray-300">
        <div className="fixed left-0 top-1/4 z-50">
          <FilterSidebar />
        </div>
        <SortBy />
      </div>

      <div className="p-6">
        {/* ✅ Breadcrumb Navigation */}
        <h1 className="text-sm mb-4">
          <Link
            to={`/category/${categoryName}`}
            className={`$${
              subCategoryName || productName ? "text-gray-500 hover:underline" : "text-black font-bold"
            }`}
          >
            {categoryName}
          </Link>
          {subCategoryName && (
            <>
              {" > "}
              <Link
                to={`/category/${categoryName}/${subCategoryName}`}
                className={`$${
                  productName ? "text-gray-500 hover:underline" : "text-black font-bold"
                }`}
              >
                {subCategoryName}
              </Link>
            </>
          )}
          {productName && (
            <>
              {" > "}
              <span className="text-black font-bold">
                {products.find(
                  (p) =>
                    p.product_name.toLowerCase().replace(/\s+/g, "-") === productName
                )?.product_name || productName.replace(/-/g, " ")}
              </span>
            </>
          )}
        </h1>

        {/* ✅ Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-8 gap-y-10 mt-6">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;