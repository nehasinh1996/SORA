import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSubcategory } from "../redux/productsSlice";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [hoveredMore, setHoveredMore] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [dispatch, status]);

  const handleMouseEnterCategory = (categoryName) => {
    clearTimeout(dropdownTimeout);
    setHoveredCategory(categoryName);
    setHoveredSubcategory(null);
  };

  const handleMouseLeaveCategory = () => {
    setDropdownTimeout(setTimeout(() => setHoveredCategory(null), 200));
  };

  const handleMouseEnterSubcategory = (subcategoryName) => {
    clearTimeout(dropdownTimeout);
    setHoveredSubcategory(subcategoryName);
  };

  const handleMouseLeaveSubcategory = () => {
    setDropdownTimeout(setTimeout(() => setHoveredSubcategory(null), 200));
  };

  const handleMouseEnterMore = () => {
    setHoveredMore(true);
  };

  const handleMouseLeaveMore = () => {
    setHoveredMore(false);
  };

  if (status === "loading") return <p>Loading categories...</p>;
  if (status === "failed") return <p>Error loading categories.</p>;

  const visibleCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  return (
    <ul className="flex space-x-6 text-gray-700 font-medium relative">
      {/* Regular categories */}
      {visibleCategories.map((category) => (
        <li
          key={category.category_name}
          className="relative group"
          onMouseEnter={() => handleMouseEnterCategory(category.category_name)}
          onMouseLeave={handleMouseLeaveCategory}
        >
          <Link to={`/category/${category.category_name}`} className="hover:text-black">
            {category.category_name}
          </Link>
          {hoveredCategory === category.category_name && category.subcategories?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
              className="absolute left-0 mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
            >
              {category.subcategories.map((sub, index) => (
                <motion.div
                  key={sub.subcategory_name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group w-auto min-w-max whitespace-nowrap"
                  onMouseEnter={() => handleMouseEnterSubcategory(sub.subcategory_name)}
                  onMouseLeave={handleMouseLeaveSubcategory}
                >
                  <h3 className="font-semibold text-sm text-gray-600 mb-2 flex items-center justify-between">
                    <Link
                      to={`/category/${category.category_name}/${sub.subcategory_name}`}
                      onClick={() => dispatch(setSubcategory(sub.subcategory_name))}
                      className="flex items-center hover:text-black"
                    >
                      {sub.subcategory_name}
                      {sub.products && sub.products.length > 0 && (
                        <ChevronRightIcon className="w-4 h-4 ml-2" />
                      )}
                    </Link>
                  </h3>
                  {hoveredSubcategory === sub.subcategory_name && sub.products?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, staggerChildren: 0.1 }}
                      className="absolute top-0 left-full bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
                    >
                      <ul className="text-xs text-gray-700">
                        {sub.products.map((product, index) => (
                          <motion.li
                            key={product.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="hover:text-black hover:bg-gray-100 p-1 rounded-md w-auto"
                          >
                            <Link
                              to={`/category/${category.category_name}/${sub.subcategory_name}/product/${product.product_name.replace(/\s+/g, "-").toLowerCase()}`}
                            >
                              {product.product_name}
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </li>
      ))}

      {/* "More" category */}
      {extraCategories.length > 0 && (
        <li
          className="relative group"
          onMouseEnter={handleMouseEnterMore}
          onMouseLeave={handleMouseLeaveMore}
        >
          <span className="hover:text-black cursor-pointer flex items-center">
            More <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>
          {(hoveredCategory === "More" || hoveredMore) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, staggerChildren: 0.1 }}
              className="absolute left-0 mt-1 bg-white rounded-md p-1 z-50 w-auto min-w-max whitespace-nowrap"
            >
              {/* First-level dropdown showing extra categories */}
              {extraCategories.map((category) => (
                <motion.div
                  key={category.category_name}
                  className="relative group w-auto min-w-max whitespace-nowrap"
                  onMouseEnter={() => handleMouseEnterCategory(category.category_name)} // Enable second-level dropdown on hover
                  onMouseLeave={handleMouseLeaveCategory}
                >
                  <Link
                    to={`/category/${category.category_name}`}
                    className="flex items-center hover:text-black"
                  >
                    {category.category_name}
                    {category.subcategories && category.subcategories.length > 0 && (
                      <ChevronRightIcon className="w-4 h-4 ml-2" />
                    )}
                  </Link>

                  {/* Show subcategories only if this category is hovered */}
                  {hoveredCategory === category.category_name && category.subcategories?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-full -mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap" //more subcategories
                    >
                      {category.subcategories.map((sub) => (
                        <motion.div
                          key={sub.subcategory_name}
                          className="relative group w-auto min-w-max whitespace-nowrap"
                        >
                          <Link
                            to={`/category/${category.category_name}/${sub.subcategory_name}`}
                            onClick={() => dispatch(setSubcategory(sub.subcategory_name))}
                            className="flex items-center hover:text-black"
                          >
                            {sub.subcategory_name}
                            {sub.products && sub.products.length > 0 && (
                              <ChevronRightIcon className="w-4 h-4 ml-2" />
                            )}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </li>
      )}
    </ul>
  );
};

export default Categories;
