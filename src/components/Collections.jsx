import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/data/collections.json"); // ✅ Fetch from public folder
        if (!response.ok) {
          throw new Error("Failed to load collections");
        }
        const data = await response.json();
        setCollections(data.collections);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="flex justify-center gap-20 mt-10 px-4">
      {collections.length > 0 ? (
        collections.map((collection, index) => (
          <Link
            key={index}
            to={collection.route}
            className="flex flex-col items-center transition-all duration-300 cursor-pointer"
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="h-32 w-32 rounded-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <h1 className="text-2xl mt-3">{collection.title}</h1>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading collections...</p>
      )}
    </div>
  );
};

export default Collections;
