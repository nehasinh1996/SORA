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

  const [selectedFilters, setSelectedFilters] = useState({
    concerns: [],
    treatment_type: [],
    ingredients: [],
    priceRange: highestPrice,
  });

  // Load filters from localStorage (only set local state here)
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

  // Now update Redux store based on local state change
  useEffect(() => {
    if (!searchQuery?.trim()) {
      dispatch(setFilters(selectedFilters));
    }
  }, [selectedFilters, searchQuery, dispatch]);

  // Reset local filters when category or subcategory changes
  useEffect(() => {
    const initialFilters = {
      concerns: [],
      treatment_type: [],
      ingredients: [],
      priceRange: highestPrice,
    };
    setSelectedFilters(initialFilters);
  }, [categoryName, subCategoryName, highestPrice]);

  // Clear Redux filters after state reset
  useEffect(() => {
    dispatch(clearFilters());
    localStorage.removeItem("filters");
  }, [categoryName, subCategoryName, dispatch]);

  const handlePriceChange = (e) => {
    const price = parseInt(e.target.value);
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters, priceRange: price };
      localStorage.setItem("filters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  const handleFilterChange = useCallback(
    (category, value) => {
      setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        if (!updatedFilters[category]) updatedFilters[category] = [];

        if (updatedFilters[category].includes(value)) {
          updatedFilters[category] = updatedFilters[category].filter((v) => v !== value);
        } else {
          updatedFilters[category] = [...updatedFilters[category], value];
        }

        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        return updatedFilters;
      });
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    const cleared = {
      concerns: [],
      treatment_type: [],
      ingredients: [],
      priceRange: highestPrice,
    };
    setSelectedFilters(cleared);
    dispatch(clearFilters());
    dispatch(setSearchQuery(""));
    localStorage.removeItem("filters");
  }, [dispatch, highestPrice]);

  const filterOptions = useMemo(() => {
    if (searchQuery?.trim()) {
      return { concerns: [], treatment_type: [], ingredients: [] };
    }

    let products = [];
    const selectedCategory = memoizedCategories.find(
      (cat) => cat.category_name === categoryName
    );
    if (!selectedCategory) return { concerns: [], treatment_type: [], ingredients: [] };

    if (productName) {
      const selectedSubcategory = selectedCategory.subcategories.find(
        (sub) => sub.subcategory_name === subCategoryName
      );

      const product = selectedSubcategory?.products.find(
        (prod) => prod.product_name === productName
      );

      if (product) {
        return {
          concerns: product.concerns || [],
          treatment_type: product.treatment_type || [],
          ingredients: product.ingredients || [],
        };
      }

      return { concerns: [], treatment_type: [], ingredients: [] };
    }

    if (subCategoryName) {
      const selectedSubcategory = selectedCategory.subcategories.find(
        (sub) => sub.subcategory_name === subCategoryName
      );
      if (selectedSubcategory) {
        products = selectedSubcategory.products;
      }
    } else {
      products = selectedCategory.subcategories.flatMap((sub) => sub.products);
    }

    products = products.filter((product) => product.price <= selectedFilters.priceRange);

    if (selectedFilters.concerns.length > 0) {
      products = products.filter((product) =>
        selectedFilters.concerns.every((concern) => product.concerns.includes(concern))
      );
    }

    if (selectedFilters.treatment_type.length > 0) {
      products = products.filter((product) =>
        selectedFilters.treatment_type.every((type) => product.treatment_type.includes(type))
      );
    }

    if (selectedFilters.ingredients.length > 0) {
      products = products.filter((product) =>
        selectedFilters.ingredients.every((ingredient) => product.ingredients.includes(ingredient))
      );
    }

    const availableConcerns = [...new Set(products.flatMap((p) => p.concerns || []))];
    const availableTreatmentTypes = [...new Set(products.flatMap((p) => p.treatment_type || []))];
    const availableIngredients = [...new Set(products.flatMap((p) => p.ingredients || []))];

    return {
      concerns: availableConcerns,
      treatment_type: availableTreatmentTypes,
      ingredients: availableIngredients,
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
