import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";

const CartTotal = () => {
  const { currency, getCartAmount } = useContext(ShopContext);
  const [amounts, setAmounts] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchCartAmounts = async () => {
      const totals = await getCartAmount();
      setAmounts(totals);
    };

    fetchCartAmounts();
  }, [getCartAmount]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 pb-4 border-b border-gray-200">
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-gray-600">
          <p className="text-lg">Subtotal</p>
          <p className="text-lg font-medium">
            {currency}
            {amounts.subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between text-gray-600">
          <p className="text-lg">Shipping</p>
          <p className="text-lg font-medium">
            {amounts.shipping === 0 ? (
              <span className="text-teal">Free</span>
            ) : (
              `${currency}${amounts.shipping.toFixed(2)}`
            )}
          </p>
        </div>

        <div className="flex justify-between text-gray-600">
          <p className="text-lg">Taxes</p>
          <p className="text-lg font-medium">
            {currency}
            {amounts.taxes.toFixed(2)}
          </p>
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-800">Total</p>
          <div className="text-right">
            <p className="text-2xl font-bold text-teal">
              {currency}
              {amounts.total.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">Including Shipping & Taxes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
