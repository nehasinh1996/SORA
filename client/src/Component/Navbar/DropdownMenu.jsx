import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Dropdown = ({ title, mainPath, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <li 
      className="relative group" 
      ref={dropdownRef} 
      onMouseEnter={() => setIsOpen(true)} 
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Main Menu Link */}
      <NavLink 
        to={mainPath} 
        className="cursor-pointer hover:text-gray-500 transition block pb-2" 
      >
        {title}
      </NavLink>

      {/* Dropdown Menu */}
      <motion.ul
        className={`absolute left-0 mt-0 w-60 bg-white shadow-lg rounded-b-lg text-sm  py-2 z-555 
          ${isOpen ? "visible opacity-100" : "invisible opacity-0"} 
        `}
        initial={{ opacity: 0, y: -10 }}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {items.length > 0 ? (
          items.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black transition"
              >
                {item.name}
              </NavLink>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">No items available</li>
        )}
      </motion.ul>
    </li>
  );
};

export default Dropdown;
