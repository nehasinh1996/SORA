import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortOption } from "../../redux/productsSlice";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortOption = useSelector((state) => state.products.sortOption);
  const [selectedOption, setSelectedOption] = useState(sortOption);

  const options = [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
    { label: "New Arrival", value: "new-arrival" },
    { label: "Best Selling", value: "best-selling" },
  ];

  useEffect(() => {
    const savedSortOption = localStorage.getItem("sortOption");
    if (savedSortOption) {
      setSelectedOption(savedSortOption);
      dispatch(setSortOption(savedSortOption));
    }
  }, [dispatch]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    dispatch(setSortOption(value));
    localStorage.setItem("sortOption", value);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-600">Sort by:</span>
      <select
        className="border px-3 py-1 rounded-md focus:outline-none cursor-pointer"
        value={selectedOption}
        onChange={handleSortChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
