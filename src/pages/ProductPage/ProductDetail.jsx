import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/productsSlice";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";
import Header from "../../components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, status, error } = useSelector(
    (state) => state.products || {}
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
  }, [dispatch, productId]);

  console.log("Selected Product:", selectedProduct); // Debugging

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!selectedProduct) return <p>Product not found.</p>;

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart(selectedProduct));
      toast.success("Product added to cart! 🛒");
    }
  };

  // ✅ Handle Add to Wishlist
  const handleAddToWishlist = () => {
    if (selectedProduct) {
      dispatch(addToWishlist(selectedProduct));
      toast.success("Product added to wishlist! ❤️");
    }
  };

  return (
    <>
      <Header />
      <ToastContainer /> {/* ✅ Add this for toast notifications */}
      <div className="max-w-5xl mx-auto p-5 mt-30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Product Image */}
          <div>
            <img
              src={
                selectedProduct.image_url || "https://via.placeholder.com/300"
              }
              alt={selectedProduct.product_name || "No Image"}
              className="w-full h-auto max-h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {selectedProduct.product_name || "Unknown Product"}
            </h2>

            {/* Category & Subcategory */}
            <p className="text-black mb-2">
              <span className="font-semibold">Category:</span>{" "}
              {selectedProduct.category_name || "Not Available"}
            </p>
            <p className="text-black mb-2">
              <span className="font-semibold">Subcategory:</span>{" "}
              {selectedProduct.subcategory_name || "Not Available"}
            </p>

            {/* Concerns */}
            {selectedProduct.concerns && (
              <div className="mb-2">
                <span className="font-semibold">Concerns:</span>
                <span className="text-gray-800">
                  {" "}
                  {selectedProduct.concerns.join(", ")}
                </span>
              </div>
            )}

            {/* Treatment Type */}
            {selectedProduct.treatment_type && (
              <div className="mb-2">
                <span className="font-semibold">Treatment Type:</span>
                <span className="text-gray-800">
                  {" "}
                  {selectedProduct.treatment_type.join(", ")}
                </span>
              </div>
            )}

            {/* Ingredients */}
            {selectedProduct.ingredients && (
              <div className="mb-4">
                <span className="font-semibold">Ingredients:</span>
                <span className="text-gray-800">
                  {" "}
                  {selectedProduct.ingredients.join(", ")}
                </span>
              </div>
            )}

            {/* Price */}
            <p className="text-xl font-semibold text-gray-800 mb-2">
              Rs. {selectedProduct.price || "N/A"}
            </p>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-white text-gray-600 px-6 py-3 rounded-lg font-semibold transition duration-300 transform hover:bg-gray-500 hover:scale-105 border-2 border-black"
              >
                🛒 ADD TO CART
              </button>

              <button
                onClick={handleAddToWishlist}
                className="text-gray-600 px-3 py-1 rounded-lg font-semibold transition duration-300 transform hover:scale-105 flex items-center gap-2 border-2 border-black"
              >
                ❤️ ADD TO WISHLIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
