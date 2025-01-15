import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router";
import CartTotal from "../components/CartTotal";
import { BsCartX } from "react-icons/bs";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length === 0) return;
    const tempData = [];

    // cartItems should be an object: { itemId: quantity, ... }
    for (const itemId in cartItems) {
      const quantity = cartItems[itemId];
      if (quantity > 0) {
        // Find the corresponding product by _id
        const product = products.find((p) => p._id === itemId);
        if (product) {
          tempData.push({
            ...product,
            quantity,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="min-h-screen">
      {products.length === 0 ? (
        <div className="flex justify-center h-[750px]">
          {/* Loading state remains unchanged */}
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-teal">
            Your Shopping Cart
          </h1>

          {cartData.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-12 text-center max-w-2xl mx-auto">
              <div className="space-y-6 sm:space-y-8">
                <div className="w-32 h-32 sm:w-48 sm:h-48 mx-auto flex items-center justify-center bg-teal/10 rounded-full">
                  <BsCartX className="w-20 h-20 sm:w-32 sm:h-32 text-teal/60" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal">
                  Your cart feels a bit lonely...
                </h2>
                <p className="text-gray-600 text-lg max-w-md mx-auto">
                  Time to treat yourself! Discover our amazing products and find
                  something special just for you.
                </p>
                <Link to="/catalog">
                  <button className="mt-6 bg-teal text-white py-3 px-8 rounded-xl hover:bg-darkTeal transform hover:-translate-y-1 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl">
                    Explore Our Collection
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {cartData.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                      <div className="relative group w-32 sm:w-40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 space-y-3 sm:space-y-4 text-center sm:text-left">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-lg sm:text-xl font-semibold text-gray-800 hover:text-teal transition-colors block"
                        >
                          {item.name}
                        </Link>

                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                          <p className="text-xl sm:text-2xl font-medium text-teal">
                            {currency}
                            {item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center bg-gray-100 rounded-xl shadow-inner">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="px-4 py-2 text-gray-600 hover:text-teal text-lg font-medium"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              min="1"
                              onChange={(e) =>
                                updateQuantity(
                                  item._id,
                                  Number(e.target.value) || 1
                                )
                              }
                              className="w-16 text-center bg-transparent border-none focus:ring-0 text-lg"
                            />
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              className="px-4 py-2 text-gray-600 hover:text-teal text-lg font-medium"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:justify-between pt-2">
                          <p className="text-gray-600 text-base sm:text-lg">
                            Subtotal:{" "}
                            <span className="font-medium text-teal">
                              {currency}
                              {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </p>
                          <button
                            onClick={() => updateQuantity(item._id, 0)}
                            className="w-full sm:w-auto px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Section */}
              <div className="lg:col-span-1 mt-6 lg:mt-0">
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 sticky top-8">
                  <CartTotal />
                  <button
                    onClick={() => navigate("/place-order")}
                    className="w-full bg-teal text-white py-3 px-6 rounded-xl hover:bg-darkTeal transform hover:-translate-y-1 transition-all duration-300 font-medium text-base sm:text-lg shadow-lg hover:shadow-xl mt-6 sm:mt-8"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
