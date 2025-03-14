import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard";

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
  const location = useLocation();
=======
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories, setCategory, setSubcategory } from "../../redux/productsSlice";
import Banner from "../../components/Banner";
import ProductCard from "../../components/ProductCard"; // Import ProductCard component

const ProductPage = () => {
  const { categoryName, subCategoryName, productName } = useParams();
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
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
<<<<<<< HEAD
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("query");

    console.log("Search Query:", searchQuery); // Debugging
    console.log("Categories Data:", categories); // Check if categories are loaded

    if (searchQuery) {
      categories.forEach((category) => {
        category.subcategories.forEach((sub) => {
          sub.products.forEach((product) => {
            if (product.product_name.toLowerCase().includes(searchQuery.toLowerCase())) {
              filteredProducts.push(product);
            }
          });
        });
      });

      console.log("Filtered Products:", filteredProducts); // Check if filtering works
    } else {
      for (let category of categories) {
        if (category.category_name.toLowerCase() === categoryName?.toLowerCase()) {
          if (subCategoryName) {
            const subcategory = category.subcategories.find(
              (sub) => sub.subcategory_name.toLowerCase() === subCategoryName.toLowerCase()
            );
            if (subcategory) {
              filteredProducts = subcategory.products;
            }
          } else {
            filteredProducts = category.subcategories.flatMap((sub) => sub.products);
          }
        }
      }

      if (productName) {
        const singleProduct = filteredProducts.find(
          (p) =>
            p.product_name.toLowerCase().replace(/\s+/g, "-") ===
            productName.toLowerCase().replace(/\s+/g, "-")
        );
        filteredProducts = singleProduct ? [singleProduct] : [];
      }
    }

    console.log("Final Products to Display:", filteredProducts); // Check final output
    setProducts(filteredProducts);
  }, [productName, categoryName, subCategoryName, categories, location.search]);
=======

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
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a

  return (
    <>
      <Banner />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
<<<<<<< HEAD
          {new URLSearchParams(location.search).get("query") ? (
            `Search results for "${new URLSearchParams(location.search).get("query")}"`
          ) : (
            <>
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
=======
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
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
            </>
          )}
        </h1>

<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => <ProductCard key={product.id} product={product} />)
=======
        {/* Always Use ProductCard Component */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
>>>>>>> 55a1c431e3d4fc8f4fd50bc84b7f71996d78165a
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductPage;
