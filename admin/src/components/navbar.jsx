import React from "react";

const Navbar = ({ setToken }) => {
  return (
    <div className="bg-teal text-white flex justify-between items-center px-6 py-4 shadow-md">
      {/* Brand Name */}
      <div className="text-lg font-bold">Sunny Shores Admin Panel</div>

      {/* Logout Button */}
      <button
        className="bg-white text-teal font-medium px-4 py-2 rounded hover:bg-gray-200 transition"
        onClick={() => setToken("")}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
