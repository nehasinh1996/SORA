import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/data/testimonials.json");
        if (!response.ok) throw new Error("Failed to load testimonials");
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Heading */}
      <div className="text-4xl font-bold text-gray-800 mb-6">
        Customer Testimonials
      </div>

      {/* Container for SVG and Swiper */}
      <div className="relative w-full py-12 flex flex-col items-center overflow-visible">
        {/* Fixed Wave/Thread */}
        <div className="absolute top-10 left-0 w-full z-0">
        <svg
  viewBox="0 0 1440 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className="w-full h-30 text-gray-200"
>
<path
  d="
  M0,50
  C120,80 240,20 360,50
  C480,80 600,20 720,50
  C840,80 960,20 1080,50
  C1200,80 1320,20 1440,50
  "
  stroke="currentColor"
  strokeWidth="2"
  fill="none"
/>

</svg>

        </div>

        {/* Swiper Wrapper */}
        <div className="relative w-full z-10">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={20}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="w-full h-120"
          >
            {testimonials.map((review, index) => {
              const isLeftClip = index % 2 === 0;
              const baseRotation = isLeftClip ? "4deg" : "-4deg";

              return (
                <SwiperSlide key={index} className="flex justify-center">
                  <div
                    className="relative bg-pink-200 p-4 mt-16 max-w-sm mx-auto cursor-pointer rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
                    style={{
                      transform: `rotate(${baseRotation})`,
                      transformOrigin: isLeftClip ? "top left" : "top right",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animation = isLeftClip
                        ? "sway 1s ease-in-out"
                        : "swayReverse 1s ease-in-out";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animation = "none";
                    }}
                  >
                    {/* Paperclip */}
                    <img
                      src="https://res.cloudinary.com/df86jjkhb/image/upload/v1742211138/paper-clip-removebg-preview_nk2o8n.png"
                      alt="Paperclip"
                      className={`absolute top-[-26px] ${
                        isLeftClip ? "left-3" : "right-3"
                      } w-10 rotate-[-10deg]`}
                    />

                    {/* Testimonial Content */}
                    <div>
                      <img
                        src={review.image_url}
                        alt={review.name}
                        className="w-full h-auto max-h-[300px] object-contain rounded-md"
                      />

                      <h3 className="text-md text-black mt-2">
                        {review.name}, {review.age}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2">
                        {review.review}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Add animation styles inside JSX */}
        <style>
  {`
    @keyframes sway {
      0% { transform: rotate(4deg) translateY(0); }
      50% { transform: rotate(-4deg) translateY(0); }
      100% { transform: rotate(4deg) translateY(0); }
    }

    @keyframes swayReverse {
      0% { transform: rotate(-4deg) translateY(0); }
      50% { transform: rotate(4deg) translateY(0); }
      100% { transform: rotate(-4deg) translateY(0); }
    }

    .relative {
      transform-style: preserve-3d;
      will-change: transform;
      translate: 0 0;
    }
  `}
</style>

      </div>
    </div>
  );
};

export default TestimonialCarousel;
