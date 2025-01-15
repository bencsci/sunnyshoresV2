import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router";

const ProductCatalog = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="bg-white shadow rounded overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      {/* Product Image */}
      <Link to={`/product/${id}`}>
        <img src={image} alt={name} className="w-full object-cover" />
      </Link>
      {/* Product Details */}
      <div className="p-4 text-center">
        <h3 className="text-lg font-medium text-black">{name}</h3>
        <p className="text-black font-bold mt-1">
          {currency}
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductCatalog;
