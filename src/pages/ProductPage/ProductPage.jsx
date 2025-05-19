  import { useEffect, useState } from "react";
  import { useParams, Link } from "react-router-dom";
  import { useSelector, useDispatch } from "react-redux";
  import { fetchCategories,setCategory,setSubcategory,} from "../../redux/productsSlice";
  import { sortProducts } from "../../redux/sortby";
  import { clearFilters } from "../../redux/filterSlice";
  import Header from "../../components/Header";
  import Banner from "../../components/Banner";
  import SortBy from "../../components/SortBy";
  import FilterSidebar from "../../components/FilterSidebar";
  import ProductCard from "../../components/ProductCard";
  import Pagination from "../../components/Pagination";
  import { fetchSearchResults } from "../../redux/searchSlice";

  const ProductPage = () => {
    const { categoryName, subCategoryName, productName } = useParams();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { sortBy } = useSelector((state) => state.sortBy);
    const { filters } = useSelector((state) => state.filter);
    const { searchQuery, searchResults } = useSelector((state) => state.search);

    const [currentPage, setCurrentPage] = useState(1);
    const PRODUCTS_PER_PAGE = 10;

    useEffect(() => {
      dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
      dispatch(clearFilters());
      localStorage.removeItem("filters");
      if (searchQuery?.trim()) {
        dispatch(fetchSearchResults(searchQuery));
      }
      if (categoryName) dispatch(setCategory(categoryName));
      if (subCategoryName) dispatch(setSubcategory(subCategoryName));
    }, [categoryName, subCategoryName, dispatch, searchQuery]);

    const matchesFilters = (product) => {
      const { concerns, treatment_type, ingredients, priceRange } = filters;
      const query = searchQuery?.trim().toLowerCase();

      const matchConcerns =
        concerns.length === 0 || concerns.some((c) => product.concerns?.includes(c));
      const matchTreatment =
        treatment_type.length === 0 || treatment_type.some((t) =>
          product.treatment_type?.includes(t)
        );
      const matchIngredients =
        ingredients.length === 0 || ingredients.some((i) =>
          product.ingredients?.includes(i)
        );
      const matchPrice = priceRange === undefined || product.price <= priceRange;

      const matchSearchQuery =
        !query ||
        product.product_name?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.subcategory?.toLowerCase().includes(query) ||
        product.concerns?.some((c) => c.toLowerCase().includes(query)) ||
        product.treatment_type?.some((t) => t.toLowerCase().includes(query)) ||
        product.ingredients?.some((i) => i.toLowerCase().includes(query));

      return matchConcerns && matchTreatment && matchIngredients && matchPrice && matchSearchQuery;
    };

    const filteredSearchResults = searchResults.filter(matchesFilters);
    const filteredProducts = products.filter(matchesFilters); 

    const displayedProducts = searchQuery?.trim()
      ? sortProducts(filteredSearchResults, sortBy)
      : productName
      ? sortProducts(
          filteredProducts.filter(
            (p) =>
              p.product_name?.toLowerCase().replace(/\s+/g, "-") ===
              productName.toLowerCase()
          ),
          sortBy
        )
      : sortProducts(filteredProducts, sortBy);

    const totalPages = Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE);
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = displayedProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };

    const renderBreadcrumb = () => (
      <div className="text-xs text-gray-700 pl-4">
        {categoryName && (
          <Link
            to={`/category/${categoryName}`}
            className={`${
              subCategoryName || productName
                ? "text-gray-500 hover:underline"
                : "text-black font-semibold"
            }`}
          >
            {categoryName}
          </Link>
        )}
        {subCategoryName && (
          <>
            {" > "}
            <Link
              to={`/category/${categoryName}/${subCategoryName}`}
              className={`${
                productName ? "text-gray-500 hover:underline" : "text-black font-semibold"
              }`}
            >
              {subCategoryName}
            </Link>
          </>
        )}
        {productName && (
          <>
            {" > "}
            <span className="text-black font-semibold">
              {products.find(
                (p) =>
                  p.product_name?.toLowerCase().replace(/\s+/g, "-") ===
                  productName
              )?.product_name || productName.replace(/-/g, " ")}
            </span>
          </>
        )}
      </div>
    );

    return (
      <>
        <Header />
        <Banner />

        {/* Breadcrumb and Sort */}
        <div className="w-full flex flex-wrap items-center justify-between bg-white border-t border-b border-l border-gray-300 sticky top-[100px] z-50 py-4">
          {renderBreadcrumb()}
          <SortBy />
        </div>

        {/* Layout */}
        <div className="flex pt-5 min-h-screen">
          {/* Filter Sidebar */}
          <div className="w-64 h-fit -mt-23">
            <FilterSidebar />
          </div>

          {/* Product Grid */}
          <div className="flex-1 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} className="product-card" />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No products found.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center px-4 pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </>
    );
  };

  export default ProductPage;
