import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import ProductItem from "./ProductItem";
import Placeholder from "../assets/Placeholder.png";

const FeaturedProducts = () => {
  const { products } = useContext(ShopContext);

  // 1) If we don’t have products yet, return a blank div (or a simple loading UI)
  if (products.length === 0) {
    return <div className="h-[500px] flex justify-center items-center" />;
  }

  // 2) Otherwise, compute the featuredProducts
  const today = new Date().getDate();
  const startIndex = products.length > 0 ? today % products.length : 0;
  const featuredProducts =
    products.length > 0
      ? [
          products[startIndex],
          products[(startIndex + 1) % products.length],
          products[(startIndex + 2) % products.length],
        ]
      : [];

  // 3) Render the featured products (or placeholders if somehow empty)
  return (
    <section className="mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.length > 0
          ? featuredProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
              />
            ))
          : [...Array(3)].map((_, idx) => (
              <ProductItem
                key={idx}
                id={1}
                image={Placeholder}
                name={"Loading Image..."}
                price={0}
              />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
