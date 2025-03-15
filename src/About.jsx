import React, { useOptimistic } from "react";
import Header from "./components/Header";

const AboutUs = () => {
  const [optimisticState, setOptimisticState] = useOptimistic(
    { hovered: false },
    (state, newState) => ({ ...state, ...newState })
  );

  return (
    <>
    <Header/>
    <div className=" text-black min-h-screen flex items-center justify-center px-4 mt-29">
      <div className="max-w-6xl mx-auto px-8 py-12 bg-white rounded-2xl flex flex-col items-center">
        <h1 className="text-5xl text-center text-black mb-8">About Us</h1>
        
        <p className="text-lg text-center max-w-4xl mx-auto mb-12 text-black font-light leading-relaxed">
          At Sora Beauty, we celebrate natural beauty through high-quality skincare and cosmetics. Our journey is fueled by a passion for self-care and empowerment, ensuring the best products for every skin type.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741518798/6_gyabph.png"
              alt="Our Story"
              className="rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 rounded-2xl"></div>
          </div>
          <div className="relative">
            <img
              src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741518797/1_fwstqs.png"
              alt="Our Values"
              className="rounded-2xl shadow-lg transform hover:scale-105 transition duration-300"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10 rounded-2xl"></div>
          </div>
        </div>

        <div className="mt-12 w-full text-center">
          <h2 className="text-3xl font-semibold text-black mb-6">Our Mission</h2>
          <p className="text-lg text-black font-light mb-8 max-w-3xl mx-auto leading-relaxed">
            We are committed to curating beauty products that are cruelty-free, sustainable, and effective. Our mission is to help individuals feel confident in their own skin.
          </p>
          <h2 className="text-3xl font-semibold text-black mb-6">Why Choose Us?</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md w-64 text-black text-lg font-light">Premium quality skincare & cosmetics</div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md w-64 text-black text-lg font-light">Ethical and cruelty-free sourcing</div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md w-64 text-black text-lg font-light">Tailored solutions for all skin types</div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <h2 className="text-3xl font-semibold text-black mb-6">Join Our Community</h2>
          <p className="text-lg text-black max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Be part of our beauty revolution! Stay updated with the latest trends, exclusive offers, and expert skincare tips.
          </p>
          <button
            className={`bg-black text-white px-8 py-4 rounded-xl text-lg font-medium transition transform shadow-lg hover:scale-110`}
            onMouseEnter={() => setOptimisticState({ hovered: true })}
            onMouseLeave={() => setOptimisticState({ hovered: false })}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;