
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto p-5 mt-30">
        <h1 className="text-2xl font-bold mb-5">❤️ Your Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlistItems.map((product) => (
              <ProductCard key={product.id} product={product} wishlistView />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
