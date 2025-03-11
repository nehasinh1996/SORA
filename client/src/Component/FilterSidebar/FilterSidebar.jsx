import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, toggleFilter, resetFilters } from "../../redux/filterSlice";
import { getFiltersForCategory } from "../../utils/filterUtils";

const FilterSidebar = ({ allProducts, category }) => {
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => state.filters.selectedCategory) || category;
  const filters = useSelector((state) => state.filters.availableFilters);
  const appliedFilters = useSelector((state) => state.filters.selectedFilters);

  useEffect(() => {
    if (selectedCategory && allProducts.length) {
      dispatch(setFilters(getFiltersForCategory(selectedCategory, allProducts)));
    }
  }, [selectedCategory, JSON.stringify(allProducts), dispatch]);

  const filterEntries = useMemo(() => Object.entries(filters), [filters]);

  return (
    <div className="filter-sidebar mt-6 p-4 bg-white text-xs ">
      {/* Header */}
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="font-semibold text-sm">FILTERS</h2>
        <button 
          onClick={() => dispatch(resetFilters())} 
          className="text-black text-sm font-medium hover:underline"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Filters List */}
      {filterEntries.length > 0 ? (
        filterEntries.map(([filterType, filterValues]) => (
          <div key={filterType} className="mb-4">
            <h3 className="font-semibold pb-2 text-gray-800">{filterType.replace("_", " ")}</h3>
            <div className="space-y-2">
              {filterValues.length > 0 ? (
                filterValues.map((value) => (
                  <label key={value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appliedFilters[filterType]?.includes(value) || false}
                      onChange={() => dispatch(toggleFilter({ filterType, value }))}
                      className="w-4 h-4  accent-black"
                    />
                    <span className="text-gray-700">{value}</span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500">No filters available</p>
              )}
            </div>
            <hr className="mt-3 border-gray-300" />
          </div>
        ))
      ) : (
        <p className="text-gray-500">No filters available</p>
      )}
    </div>
  );
};

export default FilterSidebar;
