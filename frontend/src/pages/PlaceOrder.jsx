import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shopContext";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCreditCard, FaPaypal, FaCcStripe } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    products,
  } = useContext(ShopContext);

  // Single state for all delivery form data
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [totals, setTotals] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
  });

  // Update deliveryInfo on input change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Native form validation
    if (!e.target.checkValidity()) {
      e.target.reportValidity();
      return;
    }

    try {
      let orderItems = [];

      for (const productId in cartItems) {
        const quantity = cartItems[productId];
        if (quantity > 0) {
          const productInfo = products.find((p) => p._id === productId);
          if (productInfo) {
            const itemInfo = structuredClone(productInfo);
            itemInfo.quantity = quantity;
            orderItems.push(itemInfo);
          }
        }
      }

      const amount = await getCartAmount();
      console.log(amount);

      // Validate amount and deliveryCharge
      if (isNaN(amount.total) || isNaN(amount.shipping)) {
        toast.error("System Error. Please try again later.");
        return;
      }

      let orderData = {
        address: deliveryInfo,
        items: orderItems,
        amount: Number(amount.total.toFixed(2)),
        deliveryCharge: Number(amount.shipping.toFixed(2)),
      };

      //console.log("Order Data:", orderData);

      switch (paymentMethod) {
        // Api Call for COD
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "Stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case "PayPal":
          const responsePaypal = await axios.post(
            `${backendUrl}/api/order/paypal`,
            orderData,
            { headers: { token } }
          );
          if (responsePaypal.data.success && responsePaypal.data.approvalUrl) {
            window.location.href = responsePaypal.data.approvalUrl;
          } else {
            toast.error(
              responsePaypal.data.message || "Failed to create PayPal order"
            );
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-10">
      <h1 className="text-teal text-4xl font-bold mb-8 text-center">
        Place Your Order
      </h1>

      {/* One single form for both columns */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Left Column: Delivery Information */}
          <div className="bg-white shadow-lg rounded-lg p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-6">Delivery Information</h2>

            {/* First Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={deliveryInfo.firstName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Last Name */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={deliveryInfo.lastName}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={deliveryInfo.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* Street */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={deliveryInfo.street}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            {/* City + Province */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={deliveryInfo.city}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Province
                </label>
                <input
                  type="text"
                  name="province"
                  value={deliveryInfo.province}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
            </div>

            {/* Postal Code + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={deliveryInfo.postalCode}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={deliveryInfo.country}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg p-3 mt-2"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>
          </div>

          {/* Right Column: Cart Totals and Payment Method */}
          <div className="space-y-8">
            {/* Cart Total in a styled container */}
            <div className="bg-white shadow-lg rounded-lg p-8 lg:p-12">
              <CartTotal />
            </div>

            {/* Payment Method section */}
            <div className="bg-white shadow-lg rounded-lg p-8 lg:p-12">
              <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`flex items-center w-full ${
                        paymentMethod === "cod" ? "text-teal" : "text-gray-700"
                      }`}
                    >
                      <BsCashStack className="text-2xl mr-3" />
                      <span className="font-medium">Cash on Delivery</span>
                      <div
                        className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          paymentMethod === "cod"
                            ? "border-teal"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "cod" && (
                          <div className="w-3 h-3 bg-teal rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Stripe"
                      checked={paymentMethod === "Stripe"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`flex items-center w-full ${
                        paymentMethod === "Stripe"
                          ? "text-teal"
                          : "text-gray-700"
                      }`}
                    >
                      <FaCreditCard className="text-2xl mr-3" />
                      <span className="font-medium">Stripe </span>
                      <div
                        className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          paymentMethod === "Stripe"
                            ? "border-teal"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "Stripe" && (
                          <div className="w-3 h-3 bg-teal rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={paymentMethod === "PayPal"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="hidden"
                    />
                    <div
                      className={`flex items-center w-full ${
                        paymentMethod === "PayPal"
                          ? "text-teal"
                          : "text-gray-700"
                      }`}
                    >
                      <FaPaypal className="text-2xl mr-3" />
                      <span className="font-medium">PayPal</span>
                      <div
                        className={`ml-auto w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                          paymentMethod === "PayPal"
                            ? "border-teal"
                            : "border-gray-300"
                        }`}
                      >
                        {paymentMethod === "PayPal" && (
                          <div className="w-3 h-3 bg-teal rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-teal text-white px-6 py-3 rounded-xl shadow mt-8 hover:bg-darkTeal transition-all duration-300 w-full font-medium text-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
