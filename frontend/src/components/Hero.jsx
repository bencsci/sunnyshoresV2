import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/shopContext";
import Placeholder from "../assets/Placeholder.png";
import { Link } from "react-router";

const Hero = () => {
  const { products } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (products.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % products.length);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [products]);

  const currentProduct =
    products.length > 0
      ? products[currentIndex]
      : { image: Placeholder, name: "Loading Product..." };

  return (
    <div className="relative overflow-hidden py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(0,0,0,0.2) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <article className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                Coastal Escape to{" "}
                <span className="text-teal">Summer Style!</span>
              </h1>
              <div className="w-20 h-1 bg-teal rounded-full"></div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Established in 2024, <strong>Sunny Shores</strong> was born out of
              a passion for capturing the essence of summer and the coastal
              lifestyle.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalog"
                className="bg-teal text-white py-3 px-8 rounded-lg hover:bg-darkTeal transform hover:-translate-y-1 transition-all duration-300 font-medium shadow-lg flex items-center justify-center gap-2"
              >
                Shop Now
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                to="/about"
                className="bg-white text-teal py-3 px-8 rounded-lg hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 font-medium shadow-lg border-2 border-teal"
              >
                Learn More
              </Link>
            </div>

            {/* Featured Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { number: "1000+", label: "Products" },
                { number: "50+", label: "Brands" },
                { number: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-teal">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </article>

          {/* Carousel Section */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="h-[500px] w-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">
                  {currentProduct.name}
                </h3>
                <div className="flex gap-2 mt-2">
                  {products.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "bg-white w-6" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
