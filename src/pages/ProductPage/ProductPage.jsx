import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard"; // Import ProductCard component
import Header from "../../components/Header";

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categoryName) dispatch(setCategory(categoryName));
    if (subCategoryName) dispatch(setSubcategory(subCategoryName));
  }, [categoryName, subCategoryName, dispatch]);

  useEffect(() => {
    let filteredProducts = [];

    for (let category of categories) {
      if (category.category_name === categoryName) {
        if (subCategoryName) {
          const subcategory = category.subcategories.find(
            (sub) => sub.subcategory_name === subCategoryName
          );
          if (subcategory) {
            filteredProducts = subcategory.products;
          }
        } else {
          filteredProducts = category.subcategories.flatMap((sub) => sub.products);
        }
      }
    }

    // If productName exists, filter to only show that product
    if (productName) {
      const singleProduct = filteredProducts.find(
        (p) =>
          p.product_name.toLowerCase().replace(/\s+/g, "-") ===
          productName.toLowerCase().replace(/\s+/g, "-")
      );
      filteredProducts = singleProduct ? [singleProduct] : [];
    }

    setProducts(filteredProducts);
  }, [productName, categoryName, subCategoryName, categories]);

  return (
    <>
      <Header/>
      <Banner/>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          <Link to={`/category/${categoryName}`} className="text-black hover:underline">
            {categoryName}
          </Link>
          {subCategoryName && (
            <>
              {" > "}
              <Link to={`/category/${categoryName}/${subCategoryName}`} className="text-black hover:underline">
                {subCategoryName}
              </Link>
            </>
          )}
          {productName && (
            <>
              {" > "}
              <span className="text-black">{productName.replace(/-/g, " ")}</span>
            </>
          )}
        </h1>

        {/* Always Use ProductCard Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
