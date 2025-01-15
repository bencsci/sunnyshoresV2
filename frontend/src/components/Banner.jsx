import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { ShopContext } from "../context/shopContext";

const Banner = () => {
  const {
    setCartItem,
    getCartCount,
    navigate,
    token,
    setToken,
    user,
    setUser,
  } = useContext(ShopContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItem({});
    setUser({});
    navigate("/login");
  };

  return (
    <div className="w-full bg-sand">
      {/* Main Banner Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-wrap md:flex-nowrap items-center gap-6">
          {/* Logo Section */}
          <div className="w-full md:w-1/4">
            <Link to="/" className="block hover:opacity-90 transition-opacity">
              <img
                src={assets.Logo}
                alt="Sunny Shores Logo"
                className="h-20 object-contain mx-auto md:mx-0"
              />
            </Link>
          </div>

          {/* Welcome & Time Section */}
          <div className="w-full md:w-2/4 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-teal/10">
              <h2 className="text-2xl font-semibold text-teal mb-1">
                {getGreeting()}, {user.name ? user.name : "Guest"} 👋
              </h2>
              <p className="text-gray-600">
                {formatDate()} • {formatTime()}
              </p>
              <div className="mt-3 flex justify-center gap-4 text-sm">
                <span className="px-3 py-1 bg-teal/10 rounded-full text-teal">
                  🌡️ 75°F
                </span>
                <span className="px-3 py-1 bg-teal/10 rounded-full text-teal">
                  ☀️ Sunny
                </span>
                <span className="px-3 py-1 bg-teal/10 rounded-full text-teal">
                  🌊 Waves: 3ft
                </span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="w-full md:w-1/4 flex justify-center md:justify-end space-x-6">
            <Link to="/catalog">
              <button
                className="p-2.5 rounded-full bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                title="Search Products"
              >
                <FaSearch size={22} />
              </button>
            </Link>

            <Link to="/cart" className="relative">
              <button
                className="p-2.5 rounded-full bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                title="Shopping Cart"
              >
                <FaShoppingCart size={22} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </Link>

            <div className="relative group">
              <button
                onClick={() => (token ? null : navigate("/login"))}
                className="p-2.5 rounded-full bg-teal/10 hover:bg-teal/20 text-teal transition-colors"
                title={token ? "Account Menu" : "Login"}
              >
                <FaUser size={22} />
              </button>

              {token && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                  <div className="bg-teal/5 p-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal/5"
                    >
                      <span>👤 My Profile</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-teal/5"
                    >
                      <span>📦 My Orders</span>
                    </Link>
                    <Link
                      to="/login"
                      onClick={logout}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <span>🚪 Sign Out</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
