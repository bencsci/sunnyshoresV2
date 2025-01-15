import React from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyUs from "../components/WhyUs";

const Home = () => {
  return (
    <main className="py-10">
      <div className="max-w-screen-xl mx-auto px-4">
        <Hero />
        <FeaturedProducts />
        <WhyUs />
      </div>
    </main>
  );
};

export default Home;
