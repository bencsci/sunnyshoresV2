import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const {
    token,
    setToken,
    navigate,
    backendUrl,
    getCartInfo,
    updateCartDataFromLogin,
    cartItems,
  } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const tempCartData = structuredClone(cartItems);
  const toggleState = () => {
    setCurrentState(currentState === "Sign Up" ? "Log In" : "Sign Up");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        console.log(response.data);

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          await updateCartDataFromLogin(tempCartData, response.data.token);
          getCartInfo();
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          await updateCartDataFromLogin(tempCartData, response.data.token);
          // Get cart info when user logs in, so cart will display instantly
          getCartInfo();
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <div className="h-[700px] lg:min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="hidden lg:flex lg:w-1/2 justify-center items-center bg-gray-100 h-[700px] rounded-l-2xl">
        <div className="text-center">
          <svg
            className="w-64 h-64 text-teal"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 8.5V13.5M17 11H23M4 21C4 17.134 7.13401 14 11 14C14.866 14 18 17.134 18 21M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {currentState === "Sign Up" ? "Join Our Community" : "Greetings!"}
          </h2>
          <p className="mt-2 text-gray-600 max-w-md mx-auto">
            {currentState === "Sign Up"
              ? "Create an account to enjoy personalized shopping experience and exclusive offers."
              : "Sign in to access your account, view orders, and continue shopping."}
          </p>
        </div>
      </div>

      <div className="bg-white w-full lg:w-1/2 max-w-md md:max-w-lg lg:max-w-none rounded-2xl lg:rounded-l-none shadow-2xl p-8 space-y-8 transition-all duration-300">
        {/* User Logo */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-teal rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight">
            {currentState === "Sign Up" ? "Create an Account" : "Welcome Back"}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {currentState === "Sign Up"
              ? "Join us to start shopping"
              : "Sign in to your account"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentState === "Sign Up" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal text-white py-2 px-4 rounded-lg shadow-lg hover:bg-darkTeal transition"
          >
            {currentState}
          </button>
        </form>

        {/* Toggle Sign Up/Log In */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {currentState === "Sign Up"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={toggleState}
              className="text-teal-500 font-semibold hover:underline"
            >
              {currentState === "Sign Up" ? "Log In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
