import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Banner = () => {
  const { categoryName } = useParams();
  const [banners, setBanners] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [banner, setBanner] = useState(null);
  const [fade, setFade] = useState(true);

  // Fetch banner data on component mount
  useEffect(() => {
    fetch("/data/banner.json") // ✅ Fetch from public folder
      .then((response) => response.json())
      .then((data) => setBanners(data.banners))
      .catch((error) => console.error("Error fetching banner data:", error));
  }, []);

  // Update banner when category changes
  useEffect(() => {
    if (banners.length > 0) {
      const foundBanner = banners.find((b) => b.category === categoryName);
      setBanner(foundBanner || null);
      setCurrentMessageIndex(0); // Reset message cycle on category change
    }
  }, [categoryName, banners]);

  // Cycle through messages every 4 seconds with fade effect
  useEffect(() => {
    if (banner && banner.messages.length > 1) {
      const interval = setInterval(() => {
        setFade(false);
        setTimeout(() => {
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % banner.messages.length);
          setTimeout(() => setFade(true), 300);
        }, 1000);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [banner]);

  if (!banner) return null; // No banner found, don't render

  return (
    <div className="relative w-full h-[400px] flex items-center bg-gray-200 overflow-hidden">
      {/* Left: Banner Image */}
      <div className="w-1/2 h-full">
        <img
          src={banner.image_url}
          alt={categoryName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Rotating Messages with Fade Effect */}
      <div className="w-1/2 h-full bg-green-50 flex flex-col justify-center items-center text-center p-6">
        <style jsx>{`
          .fade {
            transition: opacity 1s ease-in-out;
            opacity: ${fade ? "1" : "0"};
          }
        `}</style>
        <div key={currentMessageIndex} className="fade">
          <h2 className="text-4xl font-serif text-green-950">
            {banner.messages[currentMessageIndex][0]}
          </h2>
          <p className="text-2xl text-gray-600 mt-2 font-extralight">
            {banner.messages[currentMessageIndex][1]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;