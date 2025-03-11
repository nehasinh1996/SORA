import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import products from "../../data/products"; // Import products.js

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]); // Categories from JSON
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [backgroundText, setBackgroundText] = useState("");

  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Extract unique categories from products.js
  useEffect(() => {
    const uniqueCategories = [...new Set(products.map((item) => item.category))];
    setSuggestions(uniqueCategories);
  }, []);

  // Auto-highlight cycling effect
  useEffect(() => {
    if (suggestions.length > 0) {
      const interval = setInterval(() => {
        setHighlightIndex((prev) => (prev + 1) % suggestions.length);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [suggestions]);

  // Filter suggestions based on input
  useEffect(() => {
    if (query) {
      const matches = suggestions.filter((item) =>
        item.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredSuggestions(matches);

      // Set background hint text
      const firstMatch = matches[0];
      setBackgroundText(
        firstMatch && firstMatch.toLowerCase() !== query.toLowerCase()
          ? firstMatch.replace(new RegExp(`^${query}`, "i"), query)
          : ""
      );
    } else {
      setFilteredSuggestions([]);
      setBackgroundText("");
    }
  }, [query, suggestions]);

  // Handle input change
  const handleChange = (e) => {
    setQuery(e.target.value);
    setHighlightIndex(-1);
  };

  // Handle selecting a suggestion
  const handleSuggestionClick = (suggestion) => {
    const formattedCategory = suggestion.replace(/\s+/g, ""); // Remove spaces
    setQuery(suggestion);
    setFilteredSuggestions([]); // Hide dropdown
    navigate(`/${formattedCategory}`); // Navigate without spaces
  };

  // Handle search execution
  const handleSearch = () => {
    console.log("Search triggered with query:", query);

    if (!query.trim()) {
      console.log("Empty search, returning...");
      return;
    }

    const formattedQuery = query.replace(/\s+/g, ""); // Remove spaces
    console.log("Navigating to:", `/${formattedQuery}`);

    if (suggestions.map((cat) => cat.toLowerCase()).includes(query.toLowerCase())) {
      setFilteredSuggestions([]);
      navigate(`/${formattedQuery}`);
    } else {
      alert("Category not found");
    }
  };

  // Handle keyboard events for navigation and selection
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0 && filteredSuggestions.length > 0) {
        handleSuggestionClick(filteredSuggestions[highlightIndex]);
      } else {
        handleSearch();
      }
    }
  };

  // Clear search input
  const clearSearch = () => {
    setQuery("");
    setFilteredSuggestions([]);
    setBackgroundText("");
    setHighlightIndex(-1);
  };

  // Hide dropdown when clicking outside the search bar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-64 mx-auto mt-2" ref={searchRef}>
      {/* Search Bar */}
      <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm h-8 relative">
        <FaSearch
          className="text-gray-500 ml-2 cursor-pointer"
          size={14}
          onMouseDown={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        />

        {/* Input Field with Background Hint */}
        <div className="relative w-full">
          <div className="absolute top-0 left-0 w-full px-3 py-1 text-gray-300 pointer-events-none text-sm leading-tight">
            {backgroundText}
          </div>
          <input
            type="text"
            className="w-full px-3 py-1 text-sm leading-tight outline-none text-gray-800 bg-transparent relative z-10"
            placeholder={`Search ${
              suggestions.length > 0
                ? suggestions[highlightIndex !== -1 ? highlightIndex : 0] || "Products"
                : "Products"
            }...`}
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Clear Button */}
        {query && (
          <IoClose
            className="text-gray-500 cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-700 z-20"
            size={16}
            onClick={clearSearch}
          />
        )}
      </div>

      {/* Suggestions Dropdown */}
      {filteredSuggestions.length > 0 && !suggestions.includes(query) && (
        <ul className="absolute left-0 w-57 bg-white border border-gray-300 shadow-lg rounded-b-lg z-50 max-h-48 overflow-y-auto ml-3.5">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className={`px-3 py-2 text-sm font-medium cursor-pointer transition-all ${
                index === highlightIndex ? "bg-blue-100 text-blue-800" : "text-gray-700 hover:bg-blue-50"
              }`}
              onMouseEnter={() => setHighlightIndex(index)}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
