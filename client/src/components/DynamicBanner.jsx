import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes

const DynamicBanner = ({ isScrollingUp, isSticky }) => {
  const [offersData, setOffersData] = useState([]);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  useEffect(() => {
    fetch("/data/offers.json")
      .then((response) => response.json())
      .then((data) => setOffersData(data.offers || []))
      .catch((error) => console.error("Error loading offers:", error));
  }, []);

  useEffect(() => {
    if (offersData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offersData.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [offersData]);

  const renderMessage = (message, highlight) => {
    if (!highlight) return message;

    const highlights = Array.isArray(highlight) ? highlight : [highlight];
    const regex = new RegExp(`(${highlights.join("|")})`, "gi");

    return message.split(regex).map((part, index) =>
      highlights.includes(part) ? (
        <span key={index} style={{ fontSize: "1.1rem", color: "#FFD700", margin: "0 0.25rem", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  if (offersData.length === 0) return <div className="w-full bg-black text-white text-center p-1 text-sm font-semibold">Loading offers...</div>;

  return (
    <div
      className={`w-full bg-black text-white text-center p-1 text-sm font-semibold overflow-hidden transition-all duration-300
        ${isScrollingUp && !isSticky ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div key={currentOfferIndex} className="flex items-center justify-center gap-3" aria-live="polite">
        <span className="text-2xl">{offersData[currentOfferIndex].sticker}</span>
        <p className="text-sm md:text-sm font-medium">
          {renderMessage(offersData[currentOfferIndex].message, offersData[currentOfferIndex].highlight)}
        </p>
        <span className="text-2xl">{offersData[currentOfferIndex].sticker}</span>
      </div>
    </div>
  );
};

// ✅ Add PropTypes validation
DynamicBanner.propTypes = {
  isScrollingUp: PropTypes.bool.isRequired, // Expecting a boolean
  isSticky: PropTypes.bool.isRequired,      // Expecting a boolean
};

export default DynamicBanner;
