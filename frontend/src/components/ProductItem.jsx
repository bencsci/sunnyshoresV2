import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <div className="p-2 h-full">
      <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
        <div className="relative overflow-hidden group">
          <img src={image} className="w-full h-64 object-cover" alt={name} />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h3>
          <p className="text-xl font-bold text-teal mb-4">
            {currency}
            {price}
          </p>
          <div className="mt-auto">
            <Link to={`/product/${id}`} className="block">
              <button className="w-full bg-teal text-white py-2 px-4 rounded-md hover:bg-darkTeal transform hover:-translate-y-1 transition-all duration-300 font-medium">
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
