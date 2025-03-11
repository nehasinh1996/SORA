"use client";
import { useState, useEffect, useTransition, useDeferredValue } from "react";
import { Heart, Plus, Minus } from "lucide-react";
import useStore from "../../Context/StoreContext"; // ✅ Zustand store

const ProductCard = ({ product }) => {
  const { addToCart, removeFromCart, cart, addToWishlist, removeFromWishlist, wishlist = [] } = useStore(); // ✅ Fix applied
  const [hovered, setHovered] = useState(false);
  const deferredImage = useDeferredValue(hovered ? product.hover_image : product.image_link);
  const [isPending, startTransition] = useTransition();
  const [optimisticQuantity, setOptimisticQuantity] = useState(0);
  const isLiked = wishlist.some((item) => item.id === product.id); // ✅ No more undefined error

  useEffect(() => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity !== optimisticQuantity) {
      setOptimisticQuantity(cartItem.quantity);
    }
  }, [cart, product.id, optimisticQuantity]);

  const handleAddToCart = () => {
    startTransition(() => {
      setOptimisticQuantity((prev) => prev + 1);
      addToCart(product);
    });
  };

  const increaseQuantity = () => {
    startTransition(() => {
      setOptimisticQuantity((prev) => prev + 1);
      addToCart(product);
    });
  };

  const decreaseQuantity = () => {
    startTransition(() => {
      setOptimisticQuantity((prev) => (prev > 0 ? prev - 1 : 0));
      removeFromCart(product.id);
    });
  };

  const toggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="flex justify-center mt-30">
      <div
        className="rounded-2xl transition-all duration-300 cursor-pointer w-full sm:w-[260px] bg-white hover:shadow-lg hover:scale-105 flex flex-col relative mx-auto overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* 🔹 Image & Wishlist Button */}
        <div className="relative h-[200px] transition-all duration-40 ease-out">
          <img
            src={deferredImage}
            alt={product.name}
            className={`w-full h-full object-cover transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}
          />
          <button
            className="absolute top-2 right-2 p-1 rounded-full cursor-pointer hover:scale-110 transition-all"
            onClick={toggleWishlist}
          >
            <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </button>
        </div>

        {/* 🔹 Product Details */}
        <div className="p-3 text-start space-y-1">
          <p className="text-xs font-semibold text-gray-500 uppercase">{product.category}</p>
          <h2 className="text-sm font-semibold text-gray-800">{product.name}</h2>
          <p className="text-xs text-gray-600 h-10 overflow-hidden">{product.description}</p>
          <p className="text-sm font-bold">Rs. <span className="text-black">{product.price}</span></p>

          {/* 🔹 Quantity Controls & Add to Cart */}
          {optimisticQuantity === 0 ? (
            <button
              className="bg-black text-white px-3 py-3 text-xs rounded-lg cursor-pointer hover:bg-white transition-all w-full hover:border-black hover:border-2 hover:text-black hover:text-xs"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          ) : (
            <div className="flex items-center h-10 justify-between border rounded-lg p-1 w-full bg-gray-100">
              <button className="text-gray-600 px-1 hover:text-black" onClick={decreaseQuantity}>
                <Minus size={18} />
              </button>
              <span className="text-sm font-semibold">{optimisticQuantity}</span>
              <button className="text-gray-600 px-1 hover:text-black" onClick={increaseQuantity}>
                <Plus size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
