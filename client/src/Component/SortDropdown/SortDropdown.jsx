import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SortDropdown = ({ handleSort }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [selectedSort, setSelectedSort] = useState("New Arrival"); // Default selected option

  const handleSelect = (sortType, label) => {
    setSelectedSort(label);
    handleSort(sortType);
    setShowSortMenu(false);
  };

  return (
    <div className="relative w-64">
      {/* Sort Button */}
      <div
        className="flex justify-between items-center border border-gray-300 px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => setShowSortMenu(!showSortMenu)}
      >
        <span className="text-gray-600">
          Sort by: <span className="font-bold">{selectedSort}</span>
        </span>
        {showSortMenu ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </div>

      {/* Dropdown Menu */}
      {showSortMenu && (
        <ul className="absolute left-0 mt-2 w-full bg-white border border-gray-200 shadow-md rounded-lg z-50">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect("best_selling", "Best Selling")}>
            Best Selling
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect("new_arrival", "New Arrival")}>
            New Arrival
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect("price_low_high", "Price: Low to High")}>
            Price: Low to High
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleSelect("price_high_low", "Price: High to Low")}>
            Price: High to Low
          </li>
        </ul>
      )}
    </div>
  );
};

export default SortDropdown;
