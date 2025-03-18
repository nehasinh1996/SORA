import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Collections = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("/data/collections.json");
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
    <div className="text-center py-16 px-6 bg-gradient-to-b from-pink-100 to-white">
      {/* Section Title with Animation */}
      <motion.h1
        className="text-5xl font-bold mb-12 text-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Indulge in Self-Care
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
        {collections.length > 0 ? (
          collections.map((collection, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <Link to={collection.route}>
                {/* Image with Border & Glow Effect */}
                <motion.img
                  src={collection.image}
                  alt={collection.title}
                  className="h-44 w-44 rounded-full object-cover border-4 border-transparent transition-all duration-300 ease-in-out"
                  whileHover={{
                    scale: 1.08,
                    borderColor: "#ff69b4",
                    boxShadow: "0px 0px 25px rgba(255, 105, 180, 0.6)",
                  }}
                />

                {/* Text with Hover Effect */}
                <motion.h1
                  className="text-2xl mt-4 text-gray-800 font-semibold transition-all duration-300"
                  whileHover={{ color: "#ff69b4" }}
                >
                  {collection.title}
                </motion.h1>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">Loading collections...</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
