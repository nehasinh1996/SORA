// FilterSidebar.js
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../redux/filterSlice";
import { setSearchQuery } from "../redux/searchSlice";
import { useParams } from "react-router-dom";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories) || [];
  const { searchQuery } = useSelector((state) => state.search);
  const memoizedCategories = useMemo(() => categories, [categories]);

  const { categoryName, subCategoryName, productName } = useParams();

  const { allProducts, lowestPrice, highestPrice } = useMemo(() => {
    const all = memoizedCategories.flatMap((category) =>
      category.subcategories.flatMap((sub) => sub.products)
    );
    const prices = all.map((p) => p.price);
    return {
      allProducts: all,
      lowestPrice: Math.min(...prices, 0),
      highestPrice: Math.max(...prices, 0),
    };
  }, [memoizedCategories]);

  const getInitialFilters = () => ({
    concerns: [],
    treatment_type: [],
    ingredients: [],
    priceRange: highestPrice,
  });

  const [selectedFilters, setSelectedFilters] = useState(getInitialFilters);

  useEffect(() => {
    if (!searchQuery?.trim()) {
      const savedFilters = localStorage.getItem("filters");
      if (savedFilters) {
        try {
          const parsedFilters = JSON.parse(savedFilters);
          if (parsedFilters && typeof parsedFilters === "object") {
            setSelectedFilters(parsedFilters);
          }
        } catch (error) {
          console.error("Error parsing filters from localStorage:", error);
        }
      }
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!searchQuery?.trim()) {
      dispatch(setFilters(selectedFilters));
    }
  }, [selectedFilters, searchQuery, dispatch]);

  useEffect(() => {
    setSelectedFilters(getInitialFilters());
    dispatch(clearFilters());
    localStorage.removeItem("filters");
  }, [categoryName, subCategoryName, highestPrice, dispatch]);

  const handlePriceChange = (e) => {
    const price = parseInt(e.target.value);
    setSelectedFilters((prevFilters) => {
      const updated = { ...prevFilters, priceRange: price };
      localStorage.setItem("filters", JSON.stringify(updated));
      return updated;
    });
  };

  const handleFilterChange = useCallback((category, value) => {
    setSelectedFilters((prevFilters) => {
      const updated = { ...prevFilters };
      updated[category] = updated[category] || [];
      updated[category] = updated[category].includes(value)
        ? updated[category].filter((v) => v !== value)
        : [...updated[category], value];
      localStorage.setItem("filters", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    const cleared = getInitialFilters();
    setSelectedFilters(cleared);
    dispatch(clearFilters());
    dispatch(setSearchQuery(""));
    localStorage.removeItem("filters");
  }, [dispatch, highestPrice]);

  const filterOptions = useMemo(() => {
    if (searchQuery?.trim()) return getInitialFilters();

    const selectedCategory = memoizedCategories.find((cat) => cat.category_name === categoryName);
    if (!selectedCategory) return getInitialFilters();

    let products = [];
    if (productName) {
      const sub = selectedCategory.subcategories.find((s) => s.subcategory_name === subCategoryName);
      const product = sub?.products.find((p) => p.product_name === productName);
      return product
        ? {
            concerns: product.concerns || [],
            treatment_type: product.treatment_type || [],
            ingredients: product.ingredients || [],
          }
        : getInitialFilters();
    }

    if (subCategoryName) {
      const sub = selectedCategory.subcategories.find((s) => s.subcategory_name === subCategoryName);
      products = sub ? sub.products : [];
    } else {
      products = selectedCategory.subcategories.flatMap((s) => s.products);
    }

    products = products.filter((p) => p.price <= selectedFilters.priceRange);

    if (selectedFilters.concerns.length)
      products = products.filter((p) => selectedFilters.concerns.every((c) => p.concerns.includes(c)));

    if (selectedFilters.treatment_type.length)
      products = products.filter((p) => selectedFilters.treatment_type.every((t) => p.treatment_type.includes(t)));

    if (selectedFilters.ingredients.length)
      products = products.filter((p) => selectedFilters.ingredients.every((i) => p.ingredients.includes(i)));

    return {
      concerns: [...new Set(products.flatMap((p) => p.concerns || []))],
      treatment_type: [...new Set(products.flatMap((p) => p.treatment_type || []))],
      ingredients: [...new Set(products.flatMap((p) => p.ingredients || []))],
    };
  }, [memoizedCategories, categoryName, subCategoryName, productName, selectedFilters, searchQuery]);

  return (
    <div className="w-50 h-full border-b border-r border-gray-300 p-4 overflow-y-auto mt-18">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold">FILTER BY</h3>
        <button
          className="text-red-500 text-sm cursor-pointer hover:underline font-semibold"
          onClick={handleClearFilters}
        >
          CLEAR ALL
        </button>
      </div>

      <hr className="my-3 border-t border-gray-300 -mx-4" />

      <div className="mb-4">
        <h4 className="font-medium capitalize">Price Range</h4>
        <div className="mt-2">
          <input
            type="range"
            min={lowestPrice}
            max={highestPrice}
            step="10"
            value={selectedFilters.priceRange}
            onChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex justify-between text-xs">
            <span>Rs.{lowestPrice}</span>
            <span>Rs.{selectedFilters.priceRange}</span>
          </div>
        </div>
        <hr className="my-3 border-t border-gray-300 -mx-4" />
      </div>

      <div>
        {Object.entries(filterOptions).map(([category, values]) =>
          values.length > 0 ? (
            <div key={category} className="mb-4">
              <h4 className="font-medium capitalize">{category.replace(/_/g, " ")}</h4>
              <div className="space-y-2 mt-2">
                {values.map((value) => (
                  <label key={value} className="flex items-center space-x-2 text-xs">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category]?.includes(value) || false}
                      onChange={() => handleFilterChange(category, value)}
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
              <hr className="my-3 border-t border-gray-300 -mx-4" />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default FilterSidebar;
