import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import ProductItem from "./ProductItem";
import Placeholder from "../assets/Placeholder.png";

const FeaturedProducts = () => {
  const { products, isLoading } = useContext(ShopContext);

  if (isLoading) {
    return (
      <section className="mt-16">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, idx) => (
            <ProductItem
              key={idx}
              id={idx}
              image={Placeholder}
              name="Loading..."
              price={0}
            />
          ))}
        </div>
      </section>
    );
  }

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
                id={idx}
                image={Placeholder}
                name="No products available"
                price={0}
              />
            ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
