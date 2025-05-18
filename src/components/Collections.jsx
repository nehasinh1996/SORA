import { useState, useEffect } from "react";
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
    <div className="text-center py-10 px-6 bg-gradient-to-b from-pink-100 to-white">
      <motion.h1
        className="text-5xl font-bold mb-12 text-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Indulge in Self-Care
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-center">
        {collections.length > 0 ? (
          collections.map((collection, index) => (
            <div key={index} className="group perspective">
              <div className="relative w-44 h-44 preserve-3d duration-700 group-hover:rotate-y-180">
                
                {/* Front Side */}
                <div className="absolute backface-hidden w-full h-full">
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    className="h-full w-full rounded-full object-cover border-4 border-transparent transition-all duration-300 ease-in-out"
                    whileHover={{
                      scale: 1.05,
                      borderColor: "#ff69b4",
                      boxShadow: "0px 0px 25px rgba(255, 105, 180, 0.6)",
                    }}
                  />
                </div>
                
                {/* Back Side */}
                <div className="absolute backface-hidden w-full h-full rotate-y-180 bg-pink-200 rounded-full flex items-center justify-center">
                  <motion.h1
                    className="text-center text-gray-700 font-semibold p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {collection.title}
                  </motion.h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full">Loading collections...</p>
        )}
      </div>
    </div>
  );
};

export default Collections;
