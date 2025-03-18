import { useState, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";

const CarouselComponent = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/data/carouselImages.json");
        if (!response.ok) {
          throw new Error("Failed to load images");
        }
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <Carousel autoplay autoplayDelay={3000} loop className="w-full h-[70vh] mt-10 overflow-hidden">
      {images.length > 0 ? (
        images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`slide ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        ))
      ) : (
        <p className="text-center text-gray-500">Loading images...</p>
      )}
    </Carousel>
  );
};

export default CarouselComponent;
