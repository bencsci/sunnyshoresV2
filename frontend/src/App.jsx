import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import VerifyStripe from "./pages/VerifyStripe";
import VerifyPayPal from "./pages/VerifyPayPal";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "./index.css";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand from-30% via-sand via-85% to-sky-200">
      <ToastContainer autoClose={1000} />
      <Banner />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verifyStripe" element={<VerifyStripe />} />
        <Route path="/verifyPayPal" element={<VerifyPayPal />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
