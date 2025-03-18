
import Header from "./components/Header";
import CarouselComponent from "./components/CarouselComponent";
import Collections from "./components/Collections"; // ✅ Import Collections
import TestimonialCarousel from "./components/TestimonialCarousel";
import BannerAnimate from "./components/BannerAnimate";

const Home = () => {
  return (
    <>
      <Header />
      <CarouselComponent />
      
      <div className="mt-30">
      <Collections /> {/* ✅ Display Collections Below Carousel */}
      <BannerAnimate/>
      </div>
      <div className="mt-30">
        <TestimonialCarousel/>
      </div>

    </>
  );
};

export default Home;
