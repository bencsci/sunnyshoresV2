import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router";
import axios from "axios";

/**
 * A helper function to return a Tailwind background color class
 * based on the given status. You can customize the colors as needed.
 */
function getStatusBadgeClass(status) {
  switch (status) {
    case "Order Placed":
      return "bg-teal";
    case "Packing":
      return "bg-yellow-500";
    case "Shipped":
      return "bg-blue-500";
    case "Out for Delivery":
      return "bg-orange-500";
    case "Delivered":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load the user's orders
  const loadOrderData = async () => {
    try {
      if (!token) {
        setIsLoading(false);
        return null;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allItemOrders = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allItemOrders.push(item);
          });
        });
        setOrderData(allItemOrders.reverse());
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const clearFailedPayment = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/clear`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        console.log("Failed payments cleared");
      } else {
        console.log("Failed payments not cleared");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
    clearFailedPayment();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {isLoading ? (
        <div className="flex items-center justify-center min-h-screen"></div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="bg-teal text-white py-8 mb-8 shadow-lg border-t-2 border-darkTeal">
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">
                    Your Orders
                  </h1>
                  <p className="text-teal-100">
                    Track and manage your purchases
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold">{orderData.length}</div>
                    <div className="text-sm">Total Orders</div>
                  </div>
                  <div className="text-center px-6 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <div className="text-2xl font-bold">
                      {currency}
                      {orderData
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </div>
                    <div className="text-sm">Total Spent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-screen-xl mx-auto px-4 pb-8">
            {orderData.length === 0 ? (
              <div className="text-center space-y-6">
                <h2 className="text-lg md:text-xl font-bold text-gray-800">
                  You have no orders yet.
                </h2>
                <p className="text-gray-600">
                  Start shopping and create your first order!
                </p>
                <Link to="/catalog">
                  <button className="bg-teal hover:bg-darkTeal text-white px-4 py-2 md:px-6 md:py-2 rounded shadow mt-6">
                    Browse Catalogue
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {[
                    {
                      label: "Processing",
                      value: orderData.filter(
                        (item) => !item.status.includes("Delivered")
                      ).length,
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      label: "Delivered",
                      value: orderData.filter(
                        (item) => item.status === "Delivered"
                      ).length,
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      label: "This Month",
                      value: orderData.filter(
                        (item) =>
                          new Date(item.date).getMonth() ===
                          new Date().getMonth()
                      ).length,
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      label: "Total Items",
                      value: orderData.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      ),
                      color: "bg-purple-100 text-purple-800",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className={`${stat.color} rounded-lg p-4 text-center`}
                    >
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Orders Grid */}
                <div
                  className={`grid gap-6 ${
                    orderData.length <= 2
                      ? "grid-cols-1 max-w-2xl mx-auto"
                      : orderData.length === 3
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                      : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {orderData.map((item) => {
                    const statusClass = getStatusBadgeClass(item.status);
                    return (
                      <div
                        key={item._id}
                        className={`bg-white shadow-lg rounded-lg ${
                          orderData.length <= 2
                            ? "p-6"
                            : orderData.length === 3
                            ? "p-5"
                            : "p-4"
                        } `}
                      >
                        {/* Product Header */}
                        <div className="flex items-center space-x-4 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className={`object-cover rounded-lg ${
                              orderData.length <= 2
                                ? "w-28 h-28"
                                : orderData.length === 3
                                ? "w-24 h-24"
                                : "w-20 h-20"
                            }`}
                          />
                          <div>
                            <h3
                              className={`font-semibold text-teal line-clamp-2 ${
                                orderData.length <= 2
                                  ? "text-lg"
                                  : orderData.length === 3
                                  ? "text-base"
                                  : "text-base"
                              }`}
                            >
                              {item.name}
                            </h3>
                            <span
                              className={`inline-block px-2 py-1 rounded text-white text-xs font-medium ${statusClass} mt-1`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div
                          className={`grid grid-cols-2 gap-4 ${
                            orderData.length <= 2 ? "text-base" : "text-sm"
                          } text-gray-600 mb-4`}
                        >
                          <div>
                            <strong>Price:</strong>
                            <p>
                              {currency}
                              {item.price.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <strong>Quantity:</strong>
                            <p>{item.quantity}</p>
                          </div>
                          <div>
                            <strong>Total:</strong>
                            <p>
                              {currency}
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <strong>Payment:</strong>
                            <p>
                              {item.paymentMethod === "cod"
                                ? "Cash on Delivery"
                                : item.paymentMethod}
                            </p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t pt-3">
                          <span className="text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <Link
                            to={`/product/${item._id}`}
                            className="text-teal text-sm font-semibold hover:underline"
                          >
                            View Product →
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="shadow-lg py-6 mt-8">
            <div className="max-w-screen-lg mx-auto text-center">
              <p className="text-gray-600 mb-2">Need help with an order?</p>
              <Link to="/contact">
                <button className="text-teal font-medium">
                  Contact Support →
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
