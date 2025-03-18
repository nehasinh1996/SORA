import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white text-black py-10 mt-12">
      <hr className="my-1 border-gray-400 border-t mt-20" />
      <div className="container mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
        
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold">About</h3>
          <ul className="mt-2 text-black space-y-2">
            <li><NavLink to='/about-us'>About Us</NavLink></li>
            <li><NavLink to='/contact-us'>Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Collections Section */}
        <div>
          <h3 className="text-lg font-semibold">Collections</h3>
          <ul className="mt-2 text-black space-y-2">
            <li><NavLink to='/collections/gift-sets-combos'>Gift Sets & Combos</NavLink></li>
            <li><NavLink to='/collections/budget-friendly-picks'>Budget-Friendly Picks</NavLink></li>
            <li><NavLink to='/collections/vegan-natural'>Vegan & Natural</NavLink></li>
            <li><NavLink to='/collections/essentials'>Essentials</NavLink></li>
            <li><NavLink to='/collections/limited-edition'>Limited Edition</NavLink></li>
          </ul>
        </div>

        {/* Privacy & Terms */}
        <div>
          <h3 className="text-lg font-semibold">Privacy & Terms</h3>
          <ul className="mt-2 text-black space-y-2">
            <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
            <li><NavLink to="/refund-policy">Refund Policy</NavLink></li>
            <li><NavLink to="/return-and-cancellation-policy">Return & Cancellation Policy</NavLink></li>
            <li><NavLink to="/terms-of-service">Terms of Service</NavLink></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold">Get in Touch</h3>
          <p className="text-black mt-2">RG Biocosmetic Private Limited,<br />
            C-65 Okhla Phase 1, New Delhi 110020, India.
          </p>
          <p className="text-black mt-2 cursor-pointer">
            📞 <a href="tel:+9167894567344">+91 67894 567344</a>
          </p>
          <p className="text-black mt-2 cursor-pointer">
            ✉ <a href="mailto:sorainfo@gmail.com">sorainfo@gmail.com</a>
          </p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="text-center text-black mt-10 border-t border-gray-700 pt-5">
        <div className="flex justify-center space-x-5">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl">
            <FaFacebook />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-black text-2xl">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/home?home=&originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="text-black text-2xl">
            <FaLinkedin />
          </a>
        </div>
        <p className="mt-3">Copyright © 2025 Sora Industries Ltd.</p>
      </div>
    </footer>
  );
};

export default Footer;
