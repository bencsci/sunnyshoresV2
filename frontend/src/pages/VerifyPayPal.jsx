import React, { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/shopContext";
import { toast } from "react-toastify";

const PaypalVerify = () => {
  const [searchParams] = useSearchParams();
  const { backendUrl, token, navigate, setCartItems } = useContext(ShopContext);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/paypal/verify`,
          {
            success: searchParams.get("success"),
            orderId: searchParams.get("orderId"),
          },
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
        console.error(error);
        toast.error("Payment verification failed!");
        navigate("/cart");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Verifying payment...</div>
    </div>
  );
};

export default PaypalVerify;
