import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ProductCard = ({ product, wishlistView = false }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);

  if (!product) return null;

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  // ✅ Handle Wishlist (Add or Remove)
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
      toast.info("Removed from wishlist! ❌");
    } else {
      dispatch(addToWishlist(product));
      toast.success("Added to wishlist! ❤️");
    }
  };

  // ✅ Handle Add to Cart from Wishlist
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id)); // ✅ Remove from wishlist after adding to cart
    toast.success("Added to cart! 🛒");
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white transition duration-300 cursor-pointer w-full max-w-[270px] mx-auto relative">
        {/* Product Image with Hover Effect */}
        <div className="relative w-auto overflow-hidden h-80 object-cover">
          <img
            src={product.image_url || "/placeholder.jpg"}
            alt={product.product_name || "Product Image"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />

          {/* ✅ Conditional Icons */}
          {wishlistView ? (
            <button
              aria-label="Remove from Wishlist"
              className="absolute top-3 right-3 p-1 rounded-full bg-white text-gray-600 transition duration-300 cursor-pointer hover:bg-gray-200"
              onClick={handleWishlistClick}
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              aria-label="Add to Wishlist"
              className={`absolute top-3 right-3 p-1 rounded-full transition duration-300 
                ${isWishlisted ? "text-red-500" : "text-gray-400"} hover:scale-110`}
              onClick={handleWishlistClick}
            >
              <HeartIcon className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* ✅ Product Details */}
        <div className="text-center py-2">
          <h2 className="text-sm font-semibold text-gray-900 line-clamp-1">
            {product.product_name || "Unnamed Product"}
          </h2>
          <p className="text-gray-700 font-semibold text-sm">
            Rs. {Number(product.price).toLocaleString() || "N/A"}
          </p>

          {/* ✅ Show "Add to Cart" button only in Wishlist view */}
          {wishlistView && (
            <button
              onClick={handleAddToCart}
              className="mt-3 bg-black text-white px-4 py-2 rounded-md hover:bg-white hover:text-black border cursor-pointer"
            >
              🛒 Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

// ✅ PropTypes for validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image_url: PropTypes.string,
    product_name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  wishlistView: PropTypes.bool,
};

export default ProductCard;
