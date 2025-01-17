import React from "react";
import { useContext, useEffect } from "react";
import { ShopContext } from "../context/shopContext";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";

const Verify = () => {
  //Use Web hooks for a more secure way to verify

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyStripePayment = async () => {
    try {
      if (!token) {
        return null;
      }
      console.log(success);
      console.log(orderId);
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment successful!");
        navigate("/orders");
      } else {
        toast.error("Payment failed!");
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyStripePayment();
  }, [token]);
  return <div className="h-[800px]"></div>;
};

export default Verify;
