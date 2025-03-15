import React, { useState } from "react";
import { FaChevronDown, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Map from "./components/Map";
import Header from "./components/Header";

const faqs = [
  {
    question: "How can I track my order?",
    answer: "You can track your order in the 'My Orders' section of your account.",
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 30 days of purchase. Products must be unused and in original packaging.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally. Shipping rates may vary based on location.",
  },
  {
    question: "Are your products cruelty-free?",
    answer: "Yes, all our skincare products are cruelty-free and not tested on animals.",
  },
  {
    question: "I am not happy with the resolution provided by Customer Support; how do I proceed now?",
    answer: "You can escalate the issue by reaching out to our support team via email or phone.",
  },
];

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
      <>
      <Header/>

    <div className="w-full px-10 py-8 space-y-10">
      {/* Top Section - Image & FAQ */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* First Div - Image */}
        <div className="flex items-center justify-around">
          <img
            src="https://res.cloudinary.com/df86jjkhb/image/upload/v1741445875/contact1_gd4krk.png"
            alt="Contact Us"
            className="w-full h-105 object-cover rounded-md"
          />
        </div>

        {/* Second Div - FAQ */}
        <div className="flex flex-col justify-center bg-gray-700 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-1 rounded-md">
                <button
                  className="w-full text-left text-gray-700 font-medium flex justify-between items-center transition-all duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <FaChevronDown
                    className={`transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Form & Company Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Third Div - Write Us Form */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Write Us</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="email"
              placeholder="Email *"
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              placeholder="Comment"
              className="w-full p-2 border rounded-md"
              rows="4"
            ></textarea>
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 w-full text-2xl">
              Send
            </button>
          </form>
        </div>

        {/* Fourth Div - Company Details */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Company Name</h2>
          <p className="mb-2">
            <strong>Mobile:</strong> +91 8978364363
          </p>
          <p className="mb-2">
            <strong>Email:</strong> sorainfo@example.com
          </p>
          <p className="mb-2">
            <strong>WhatsApp:</strong> +91 989874635
          </p>
          <p className="mb-4">
            <strong>Address:</strong> SORA Pvt. Ltd, New Delhi, India.
          </p>
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <div className="flex space-x-4 mt-2">
            <NavLink to="#" className="text-blue-600 text-2xl">
              <FaFacebook />
            </NavLink>
            <NavLink to="#" className="text-red-600 text-2xl">
              <FaInstagram />
            </NavLink>
            <NavLink to="#" className="text-blue-400 text-2xl">
              <FaLinkedin />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[400px] mt-6 ">
        <Map />
      </div>
    </div>
    </>
  );
};

export default ContactUs;
