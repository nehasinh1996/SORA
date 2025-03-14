import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product }) => {
  if (!product) return null; // Prevent errors if product is missing

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white transition duration-300 cursor-pointer w-full max-w-[250px] mx-auto p-2">
        
        {/* Product Image with Hover Effect */}
        <div className="relative w-full overflow-hidden h-56 rounded-xl">
          <img
            src={product.image_url || "/placeholder.jpg"} // Fallback image
            alt={product.product_name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-xl"
          />
          
          {/* Wishlist Heart Icon */}
          <button
            aria-label="Add to Wishlist"
            className="absolute top-3 right-3 bg-white p-1 rounded-full shadow-md text-gray-400 hover:text-red-500 hover:scale-110 transition duration-300"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <HeartIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-3 text-center">
          <h2 className="text-md font-semibold text-gray-900 line-clamp-1">
            {product.product_name || "Unnamed Product"}
          </h2>
          <p className="text-gray-700 font-semibold text-md mt-1">
            Rs. {Number(product.price).toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
