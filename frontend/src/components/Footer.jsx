import React from "react";
// Optional: If you're using React Icons
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-teal text-white relative">
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
            <Link
              to="/"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Catalog
            </Link>
            <Link
              to="/about"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm md:text-base hover:text-gray-200 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Section: Social + Copyright */}
          <div className="flex flex-col items-start md:items-end">
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
