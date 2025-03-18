import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../redux/sortby";
import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sortBy.sortBy);
  const { categoryName, subCategoryName, productName } = useParams(); // ✅ Detect changes in URL params
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { value: "recommended", label: "Recommended" },
    { value: "low-high", label: "Price: Low to High" },
    { value: "high-low", label: "Price: High to Low" },
    { value: "new-arrival", label: "New Arrivals" },
    { value: "best-selling", label: "Best Selling" },
  ];

  // ✅ Reset sorting when category, subcategory, or product changes
  useEffect(() => {
    dispatch(setSortBy("recommended"));
  }, [categoryName, subCategoryName, productName, dispatch]);

  const selectedLabel = options.find((opt) => opt.value === sortBy)?.label || "Recommended";

  const handleSelect = (value) => {
    dispatch(setSortBy(value));
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef} 
      className="relative w-fit z-50"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Dropdown Trigger Box */}
      <div className="flex items-center gap-2 text-black text-sm font-medium cursor-pointer border border-gray-300 px-4 py-2 hover:border-gray-500 transition">
        <span className="text-gray-700">Sort by : </span>
        <span className="font-bold">{selectedLabel}</span>
        <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="absolute left-0 top-full bg-white border border-gray-300 rounded-b-lg overflow-hidden w-full text-black">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-2 py-2 text-sm cursor-pointer hover:bg-gray-200 transition ${
                sortBy === option.value ? "bg-gray-100 font-bold" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortBy;
