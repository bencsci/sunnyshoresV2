import React from "react";
import { NavLink } from "react-router";
import { FaPlus, FaList, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=" bg-teal text-white shadow-lg flex flex-col w-16 md:w-64 transition-all">
      {/* Navigation Links */}
      <nav className="flex flex-col flex-1 py-6 space-y-4 items-center md:items-start">
        {/* Add Items */}
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center md:space-x-4 px-2 md:px-4 py-2 rounded text-lg font-medium hover:bg-white hover:text-teal ${
              isActive ? "bg-white text-teal" : ""
            }`
          }
        >
          <FaPlus className="text-2xl" />
          <span className="hidden md:inline">Add Items</span>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center md:space-x-4 px-2 md:px-4 py-2 rounded text-lg font-medium hover:bg-white hover:text-teal ${
              isActive ? "bg-white text-teal" : ""
            }`
          }
        >
          <FaList className="text-2xl" />
          <span className="hidden md:inline">List Items</span>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex flex-col md:flex-row items-center md:space-x-4 px-2 md:px-4 py-2 rounded text-lg font-medium hover:bg-white hover:text-teal ${
              isActive ? "bg-white text-teal" : ""
            }`
          }
        >
          <FaShoppingCart className="text-2xl" />
          <span className="hidden md:inline">Orders</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="px-2 md:px-6 py-4 text-center text-sm border-t border-white w-full">
        <span className="hidden md:inline">© 2025 Sunny Shores</span>
      </div>
    </div>
  );
};

export default Sidebar;
