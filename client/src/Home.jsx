import React from "react";

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-4">Welcome to the Home Page!</h1>
      <p className="text-lg text-center mb-8">
        This is where the main content of your website will go.
      </p>
      
      <div className="flex justify-center items-center">
        <button className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
