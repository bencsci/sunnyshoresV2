import React, { useContext } from "react";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyUs from "../components/WhyUs";
import LoadingBar from "../components/LoadingBar";
import { ShopContext } from "../context/shopContext";

const Home = () => {
  const { isLoading } = useContext(ShopContext);

  return (
    <main className="py-10">
      {isLoading && <LoadingBar />}
      <div className="max-w-screen-xl mx-auto px-4">
        <Hero />
        <FeaturedProducts />
        <WhyUs />
      </div>
    </main>
  );
};

export default Home;
