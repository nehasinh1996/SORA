import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, clearFilters } from "../redux/filterSlice";
import { FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const FilterSidebar = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories) || [];
  const memoizedCategories = useMemo(() => categories, [categories]);
  
  const { categoryName, subCategoryName, productName } = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    concerns: [],
    treatment_type: [],
    ingredients: [],
  });

  useEffect(() => {
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
  }, []);

  const filterOptions = useMemo(() => {
    const selectedCategory = memoizedCategories.find((cat) => cat.category_name === categoryName);
    if (!selectedCategory) return { concerns: [], treatment_type: [], ingredients: [] };

    let products = [];

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

    if (productName) {
      const selectedProduct = products.find(
        (prod) => prod.product_name.replace(/\s+/g, "-").toLowerCase() === productName
      );
      return selectedProduct
        ? {
            concerns: selectedProduct.concerns || [],
            treatment_type: selectedProduct.treatment_type || [],
            ingredients: selectedProduct.ingredients || [],
          }
        : { concerns: [], treatment_type: [], ingredients: [] };
    }

    return {
      concerns: [...new Set(products.flatMap((p) => p.concerns || []))],
      treatment_type: [...new Set(products.flatMap((p) => p.treatment_type || []))],
      ingredients: [...new Set(products.flatMap((p) => p.ingredients || []))],
    };
  }, [memoizedCategories, categoryName, subCategoryName, productName]);

  const handleFilterChange = useCallback((category, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[category]) {
        updatedFilters[category] = [];
      }
      if (updatedFilters[category].includes(value)) {
        updatedFilters[category] = updatedFilters[category].filter((v) => v !== value);
      } else {
        updatedFilters[category] = [...updatedFilters[category], value];
      }
      return { ...updatedFilters };
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    dispatch(setFilters(selectedFilters));
    localStorage.setItem("filters", JSON.stringify(selectedFilters));
    setIsHovered(false);
  }, [dispatch, selectedFilters]);

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
    localStorage.removeItem("filters");
    setSelectedFilters({ concerns: [], treatment_type: [], ingredients: [] });
  }, [dispatch]);

  return (
    <div className="fixed top-14 left-0 z-50">
      <div 
        className="relative" 
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="fixed top-114 cursor-pointer flex items-center gap-2 bg-white text-black text-lg font-medium border border-gray-300 px-3 py-2 rounded-r-md transition">
          <FaBars />
        </div>

        <motion.div
          className="absolute top-10 left-0 bg-white border border-gray-300 p-4 min-w-[260px] max-h-[80vh] overflow-y-auto rounded-r-md"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: isHovered ? "0%" : "-100%", opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-semibold">FILTER BY</h3>
            <button 
              className="text-red-500 text-sm cursor-pointer hover:underline font-semibold"
              onClick={handleClearFilters}
            >
              CLEAR ALL
            </button>
          </div>

          <hr className="my-3 border-t border-gray-400 w-full" />

          <div className="pr-2">
            {Object.entries(filterOptions).map(([category, values]) =>
              values.length > 0 ? (
                <div key={category} className="mb-3">
                  <h4 className="font-medium capitalize">{category.replace(/_/g, " ")}</h4>
                  <div className="block space-y-1 mt-2">
                    {values.map((value) => (
                      <label key={value} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={selectedFilters[category]?.includes(value) || false}
                          onChange={() => handleFilterChange(category, value)}
                        />
                        <span>{value}</span>
                      </label>
                    ))}
                  </div>
                  <hr className="my-3 border-t border-gray-400 w-full" />
                </div>
              ) : null
            )}
          </div>

          <div className="flex gap-2 mt-3">
            <button 
              className="w-full text-center font-semibold text-black px-4 py-1 rounded-lg border transition cursor-pointer hover:underline"
              onClick={handleApplyFilters}
            >
              APPLY
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FilterSidebar;
