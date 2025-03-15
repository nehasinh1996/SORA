import React from "react";
import Header from "./components/Header";
import CarouselComponent from "./components/CarouselComponent";
import Collections from "./components/Collections"; // ✅ Import Collections

const Home = () => {
  return (
    <>
      <Header />
      <CarouselComponent />
      <h1 className="text-center text-5xl mt-8">Our Collections</h1>
      <Collections /> {/* ✅ Display Collections Below Carousel */}
      <div className="mt-12">
      <img src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741445882/imgg_liutlg.jpg" alt="Banner" className="w-full"/>
      </div>

    </>
  );
};

export default Home;
