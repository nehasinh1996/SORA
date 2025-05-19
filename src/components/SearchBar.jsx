import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, fetchSearchResults } from "../redux/searchSlice";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const searchBarRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchResults, isLoading } = useSelector((state) => state.search);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setQuery("");
        dispatch(setSearchQuery(""));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (debounceTimeout) clearTimeout(debounceTimeout);
    };
  }, [debounceTimeout]);

  const handleClear = () => {
    setQuery("");
    dispatch(setSearchQuery(""));
  };

  return (
    <div
      className="relative w-72 sm:w-60 md:w-72 lg:w-64 mx-auto mt-2 z-50"
      ref={searchBarRef}
    >
      <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm h-10 md:h-12 lg:h-8">
        <div className="ml-3 text-gray-500">
          <FaSearch size={14} />
        </div>
        <input
          type="text"
          className="w-60 sm:w-52 md:w-64 lg:w-56 px-3 py-1 text-sm outline-none text-gray-800 bg-transparent"
          placeholder="Search for products..."
          value={query}
          disabled
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="mr-3 text-gray-500 focus:outline-none"
          >
            <IoClose size={16} />
          </button>
        )}
      </div>

      {query && searchResults.length > 0 && (
        <div className="absolute w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white border border-gray-200 rounded-md mt-1 max-h-60 overflow-y-auto">
          {isLoading ? (
            <p className="text-center py-2">Loading...</p>
          ) : (
            searchResults.map((result, index) => (
              <div
                key={index}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm"
              >
                {result.product_name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
