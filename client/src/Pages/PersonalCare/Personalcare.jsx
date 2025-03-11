import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Component/ProductCard/ProductCard";
import SortDropdown from "../../Component/SortDropdown/SortDropdown";
import productsData from "../../data/products";
import CategoryBanner from "../../Component/CatagoryBanner/CategoryBanner";
import FilterSidebar from "../../Component/FilterSidebar/FilterSidebar";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const PersonalCare = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isHoveringHamburger, setIsHoveringHamburger] = useState(false);
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false);
  const category = "Personal Care";

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const personalCareProducts = productsData.filter(
      (product) => product.category === category
    );
    setProducts(personalCareProducts);
    setFilteredProducts(personalCareProducts);
    setLoading(false);

    const params = new URLSearchParams(location.search);
    const savedSortOption = params.get("sort");

    if (savedSortOption) {
      setSortOption(savedSortOption);
      handleSort(savedSortOption, personalCareProducts);
    }
  }, []);

  const handleSort = (sortKey, productList = filteredProducts) => {
    let sortedProducts = [...productList];

    switch (sortKey) {
      case "best_selling":
        sortedProducts.sort((a, b) => b.sales - a.sales);
        break;
      case "new_arrival":
        sortedProducts.sort((a, b) => new Date(b.date_added) - new Date(a.date_added));
        break;
      case "price_low_high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price_high_low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        sortedProducts = [...products];
    }

    setSortOption(sortKey);
    setFilteredProducts(sortedProducts);
    
    const params = new URLSearchParams(location.search);
    params.set("sort", sortKey);
    navigate({ search: params.toString() });
  };

  useEffect(() => {
    if (isHoveringHamburger || isHoveringSidebar) {
      setIsFilterOpen(true);
    } else {
      setIsFilterOpen(false);
    }
  }, [isHoveringHamburger, isHoveringSidebar]);

  return (
    <>
      <CategoryBanner 
  title={category} 
  imageSrc="Personalcare_banner.png" 
  texts={[
    ["Self-Care is Self-Love!", "Tailored personal care solutions to make you feel your best!"],
    ["Self-Care, Every Day!", "Feel fresh, feel empowered."],
    ["Because You Deserve the Best!", "Personal care tailored for you."],
    ["Confidence Starts with Care!", "Elevate your routine, embrace self-love."],
    ["Feel Good, Look Good!", "Self-care that empowers every woman."]
  ]} 
/>


      <div className="flex justify-between items-center px-5 mt-4 mb-6">
        <button 
          className="bg-gray-800 text-white p-2 rounded-lg shadow-lg flex items-center -ml-6"
          onMouseEnter={() => setIsHoveringHamburger(true)}
          onMouseLeave={() => setIsHoveringHamburger(false)}
        >
          <FaBars className="text-xl" />
        </button>
        <div className="relative z-10 w-auto">
          <SortDropdown handleSort={handleSort} selectedSort={sortOption} />
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-auto bg-white border-r border-gray-300 p-4 overflow-y-auto max-h-screen transform transition-transform duration-300 ease-in-out z-[50] shadow 
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
        onMouseEnter={() => setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
      >
        <button 
          className="absolute top-4 right-4 text-gray-600 text-3xl"
          onClick={() => setIsFilterOpen(false)}
        >
          <IoClose />
        </button>
        <FilterSidebar category={category} allProducts={products} setFilteredProducts={setFilteredProducts} />
      </div>

      <div className="w-full">
        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-center text-lg col-span-4">No personal care products available.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalCare;