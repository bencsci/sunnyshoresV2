import React from "react";
// Optional: If you're using React Icons
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-teal text-white relative">
      {/* Decorative wave at the top (optional) */}
      <div className="-mt-1">
        <svg
          className="w-full h-8 text-teal"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,256L48,245.3C96,235,192,213,288,197.3C384,181,480,171,576,154.7C672,139,768,117,864,128C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section: Brand Info */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold">Sunny Shores</h3>
            <p className="text-sm md:text-base mt-1">
              Catch the waves, embrace the sun.
            </p>
          </div>

          {/* Middle Section: Quick Links */}
          <nav className="mb-6 md:mb-0 md:mx-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Catalog
            </a>
            <a
              href="#"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Right Section: Social + Copyright */}
          <div className="flex flex-col items-start md:items-end">
            {/* Social Icons (Optional) */}
            <div className="flex space-x-4 mb-2">
              <a
                href="#"
                className="hover:text-gray-200 transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="hover:text-gray-200 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:text-gray-200 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Sunny Shores. All rights
              reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
