import React, { useContext, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { NavLink } from "react-router";
import { ShopContext } from "../context/shopContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      setNav(false);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="flex justify-between items-center h-20 bg-teal px-4 text-white shadow-lg">
      <h1 className="text-3xl font-bold hover:text-teal-100 transition-colors">
        <NavLink to="/">Sunny Shores</NavLink>
      </h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-6">
        <li className="relative group">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-4 transition-colors hover:text-teal-100 ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Home
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform`}
            ></span>
          </NavLink>
        </li>
        <li className="relative group">
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              `p-4 transition-colors hover:text-teal-100 ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Catalogue
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform`}
            ></span>
          </NavLink>
        </li>
        <li className="relative group">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `p-4 transition-colors hover:text-teal-100 ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            About
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform`}
            ></span>
          </NavLink>
        </li>
        <li className="relative group">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `p-4 transition-colors hover:text-teal-100 ${
                isActive ? "font-semibold" : ""
              }`
            }
          >
            Contact
            <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform`}
            ></span>
          </NavLink>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div
        onClick={handleNav}
        className="block md:hidden hover:text-teal-100 transition-colors"
      >
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          nav ? "left-0" : "-left-full"
        } fixed top-0 w-[60%] h-full bg-teal text-white ease-in-out duration-300 z-50 shadow-2xl`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <h1 className="text-3xl font-bold m-4 hover:text-teal-100 transition-colors">
          <NavLink to="/" onClick={handleNav}>
            Sunny Shores
          </NavLink>
        </h1>
        <ul className="p-4">
          <li className="py-4 hover:bg-teal-600 rounded transition-colors">
            <NavLink
              to="/"
              onClick={handleNav}
              className={({ isActive }) =>
                `block px-4 ${isActive ? "font-semibold" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li className="py-4 hover:bg-teal-600 rounded transition-colors">
            <NavLink
              to="/catalog"
              onClick={handleNav}
              className={({ isActive }) =>
                `block px-4 ${isActive ? "font-semibold" : ""}`
              }
            >
              Catalogue
            </NavLink>
          </li>
          <li className="py-4 hover:bg-teal-600 rounded transition-colors">
            <NavLink
              to="/about"
              onClick={handleNav}
              className={({ isActive }) =>
                `block px-4 ${isActive ? "font-semibold" : ""}`
              }
            >
              About
            </NavLink>
          </li>
          <li className="py-4 hover:bg-teal-600 rounded transition-colors">
            <NavLink
              to="/contact"
              onClick={handleNav}
              className={({ isActive }) =>
                `block px-4 ${isActive ? "font-semibold" : ""}`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
