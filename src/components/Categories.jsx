import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSubcategory } from "../redux/productsSlice";
import { clearSearchQuery } from "../redux/searchSlice";
import { clearFilters } from "../redux/filterSlice";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, status } = useSelector((state) => state.products);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState(null);
  const [hoveredMore, setHoveredMore] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);

  const subcategoryParentVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const subcategoryChildVariant = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (status === "idle") dispatch(fetchCategories());
  }, [dispatch, status]);

  
  const handleMouseEnter = (setter, value) => {
    clearTimeout(dropdownTimeout);
    setter(value);
  };

  const handleMouseLeave = (setter) => {
    setDropdownTimeout(setTimeout(() => setter(null), 200));
  };

  const handleNavigation = (subcategory = null) => {
    dispatch(clearSearchQuery());
    dispatch(clearFilters());
    localStorage.removeItem("filters");
    if (subcategory) {
      dispatch(setSubcategory(subcategory));
    }
  };

  const visibleCategories = categories.slice(0, 5);
  const extraCategories = categories.slice(5);

  if (status === "loading") return <p>Loading categories...</p>;
  if (status === "failed") return <p>Error loading categories.</p>;

  return (
    <ul className="flex flex-wrap gap-4 sm:gap-6 text-gray-700 font-medium relative">
      {visibleCategories.map((category) => (
        <li
          key={category.category_name}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(setHoveredCategory, category.category_name)}
          onMouseLeave={() => handleMouseLeave(setHoveredCategory)}
        >
          <Link
            to={`/category/${category.category_name}`}
            className="hover:text-black"
            onClick={() => handleNavigation()}
          >
            {category.category_name}
          </Link>

          {hoveredCategory === category.category_name && category.subcategories?.length > 0 && (
            <motion.div
              variants={subcategoryParentVariant}
              initial="hidden"
              animate="visible"
              className="absolute left-0 mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
            >
              {category.subcategories.map((sub) => (
                <motion.div
                  key={sub.subcategory_name}
                  variants={subcategoryChildVariant}
                  className="relative group w-auto min-w-max whitespace-nowrap"
                  onMouseEnter={() => handleMouseEnter(setHoveredSubcategory, sub.subcategory_name)}
                  onMouseLeave={() => handleMouseLeave(setHoveredSubcategory)}
                >
                  <h3 className="font-semibold text-sm text-gray-600 mb-2 flex items-center justify-between">
                    <Link
                      to={`/category/${category.category_name}/${sub.subcategory_name}`}
                      onClick={() => handleNavigation(sub.subcategory_name)}
                      className="flex items-center hover:text-black hover:bg-gray-100"
                    >
                      {sub.subcategory_name}
                      {sub.products?.length > 0 && <ChevronRightIcon className="w-4 h-4 ml-2" />}
                    </Link>
                  </h3>

                  {hoveredSubcategory === sub.subcategory_name && sub.products?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-full bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
                    >
                      <motion.ul
                        variants={subcategoryParentVariant}
                        initial="hidden"
                        animate="visible"
                        className="text-xs text-gray-600"
                      >
                        {sub.products.map((product) => (
                          <motion.li
                            key={product.id}
                            variants={subcategoryChildVariant}
                            className="hover:text-black hover:bg-gray-100 p-1 rounded-md"
                          >
                            <Link
                              to={`/category/${category.category_name}/${sub.subcategory_name}/product/${product.product_name.replace(/\s+/g, "-").toLowerCase()}`}
                              onClick={() => handleNavigation(sub.subcategory_name, product)}
                            >
                              {product.product_name}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </li>
      ))}

      {extraCategories.length > 0 && (
        <li
          className="relative group"
          onMouseEnter={() => setHoveredMore(true)}
          onMouseLeave={() => setHoveredMore(false)}
        >
          <span className="hover:text-black cursor-pointer flex items-center">
            More <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>

          {hoveredMore && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 mt-2 bg-white rounded-md p-2 z-50 w-auto min-w-max whitespace-nowrap"
            >
              {extraCategories.map((category) => (
                <motion.div
                  key={category.category_name}
                  className="relative group w-auto min-w-max whitespace-nowrap"
                  onMouseEnter={() => handleMouseEnter(setHoveredCategory, category.category_name)}
                  onMouseLeave={() => handleMouseLeave(setHoveredCategory)}
                >
                  <Link
                    to={`/category/${category.category_name}`}
                    className="flex items-center hover:text-black"
                    onClick={() => handleNavigation()}
                  >
                    {category.category_name}
                    {category.subcategories?.length > 0 && (
                      <ChevronRightIcon className="w-4 h-4 ml-2" />
                    )}
                  </Link>

                  {hoveredCategory === category.category_name && category.subcategories?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-full -mt-2 bg-white rounded-md p-4 z-50 w-auto min-w-max whitespace-nowrap"
                    >
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.subcategory_name}
                          to={`/category/${category.category_name}/${sub.subcategory_name}`}
                          className="block hover:text-black mb-2"
                          onClick={() => handleNavigation(sub.subcategory_name)}
                        >
                          {sub.subcategory_name}
                        </Link>
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
