import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/productsSlice";
import Header from "../../components/Header";

const ProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    
    const { selectedProduct, status, error } = useSelector(state => state.products || {});

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductById(Number(productId)));
        }
    }, [dispatch, productId]);

    console.log("Selected Product:", selectedProduct); // Debugging

    if (status === "loading") return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!selectedProduct) return <p>Product not found.</p>;

    return (
        <>
        <Header/>
        <div className="max-w-5xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Product Image */}
                <div>
                    <img 
                        src={selectedProduct.image_url || "https://via.placeholder.com/300"} 
                        alt={selectedProduct.product_name || "No Image"} 
                        className="w-full h-auto max-h-[500px] object-cover rounded-lg"
                    />
                </div>

                {/* Product Details */}
                <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedProduct.product_name || "Unknown Product"}</h2>

                    {/* Category & Subcategory */}
                    <p className="text-gray-700">
    <span className="font-semibold">Category:</span> {selectedProduct.category_name || "Not Available"}
</p>
<p className="text-gray-700 mb-2">
    <span className="font-semibold">Subcategory:</span> {selectedProduct.subcategory_name || "Not Available"}
</p>

                    {/* Concerns */}
                    {selectedProduct.concerns && (
                        <div className="mb-2">
                            <span className="font-semibold">Concerns:</span> 
                            <span className="text-gray-600"> {selectedProduct.concerns.join(", ")}</span>
                        </div>
                    )}

                    {/* Treatment Type */}
                    {selectedProduct.treatment_type && (
                        <div className="mb-2">
                            <span className="font-semibold">Treatment Type:</span> 
                            <span className="text-gray-600"> {selectedProduct.treatment_type.join(", ")}</span>
                        </div>
                    )}

                    {/* Ingredients */}
                    {selectedProduct.ingredients && (
                        <div className="mb-4">
                            <span className="font-semibold">Ingredients:</span> 
                            <span className="text-gray-600"> {selectedProduct.ingredients.join(", ")}</span>
                        </div>
                    )}

                    {/* Price (Moved Above Buttons) */}
                    <p className="text-xl font-semibold text-gray-800 mb-2">Rs.{selectedProduct.price || "N/A"}</p>

                    {/* Buttons */}
                    <div className="flex gap-4">
                        <button className="bg-black text-white px-5 py-2 rounded-md font-semibold hover:bg-gray-800 transition">
                            ADD TO CART
                        </button>
                        <button className="border border-gray-400 text-gray-800 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition">
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
