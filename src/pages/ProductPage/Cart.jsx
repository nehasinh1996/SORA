import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // ✅ Confirmation State
  const [confirmAction, setConfirmAction] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ Calculate total price and total items
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ✅ Handle Place Order
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      toast.info("Please login to proceed with the order.");
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  // ✅ Handle Confirm Action
  const handleConfirmAction = (action, item) => {
    setConfirmAction(action);
    setSelectedItem(item);
  };

  // ✅ Confirmed Action (Yes Click)
  const handleConfirmYes = () => {
    if (confirmAction === "remove" && selectedItem) {
      dispatch(removeFromCart(selectedItem.id));
      toast.success("Item removed successfully!");
    } else if (confirmAction === "wishlist" && selectedItem) {
      dispatch(addToWishlist(selectedItem));
      dispatch(removeFromCart(selectedItem.id));
      toast.success("Item moved to wishlist!");
    }
    setConfirmAction(null);
    setSelectedItem(null);
  };

  // ✅ Handle Navigate to Product Detail
  const handleNavigateToDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-5 mt-30">
      <h1 className="text-2xl font-semibold mb-5">Shopping Cart ({totalItems} items)</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* ✅ Left Section: Cart Items with Scroll */}
          <div className="col-span-2 bg-white p-5 rounded-md shadow max-h-[500px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex gap-4 items-start">
                  {/* ✅ Product Image with Link to Product Detail */}
                  <img
                    src={item.image_url || "/placeholder.jpg"}
                    alt={item.product_name}
                    className="w-24 h-24 object-cover rounded cursor-pointer hover:scale-105 transition"
                    onClick={() => handleNavigateToDetail(item.id)} // ✅ Navigate to detail
                  />
                  {/* Product Details */}
                  <div>
                    <h2 className="text-lg font-semibold">{item.product_name}</h2>
                    

                    {/* ✅ Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className={`w-8 h-8 rounded-full border text-lg ${
                          item.quantity === 1
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-300"
                        }`}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={item.quantity}
                        className="w-10 text-center border bg-white"
                      />
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="w-8 h-8 rounded-full border text-lg bg-gray-100 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* ✅ Wishlist & Remove Buttons */}
                    <div className="flex items-center gap-4 mt-2">
                      <button
                        onClick={() => handleConfirmAction("wishlist", item)}
                        className="text-blue-500 hover:underline"
                      >
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => handleConfirmAction("remove", item)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                {/* ✅ Price */}
                <p className="text-lg font-semibold">Rs. {item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* ✅ Right Section: Price Details */}
          <div className="bg-white p-5 rounded-md shadow h-80">
            <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Price ({totalItems} items)</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-green-600 mb-2">
              <span>Discount</span>
              <span>- Rs. 0</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Delivery Charges</span>
              <span className="text-green-500">Free</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2 font-semibold">
              <span>Total Amount</span>
              <span>Rs. {totalPrice.toLocaleString()}</span>
            </div>

            {/* ✅ Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="mt-5 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      )}

      {/* ✅ Confirmation Modal */}
      {confirmAction && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              Are you sure you want to{" "}
              {confirmAction === "remove" ? "remove" : "add to wishlist"} this
              item?
            </h3>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmYes}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmAction(null)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
