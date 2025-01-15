import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from your backend
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // On component mount or when 'token' changes
  useEffect(() => {
    fetchAllOrders();
    // eslint-disable-next-line
  }, [token]);

  // Format 'date' (number / timestamp) into a readable string
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  // Render the address fields
  const renderAddress = (address = {}) => {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      province,
      postalCode,
      country,
      phone,
    } = address;

    return (
      <>
        <p>
          <strong>Name:</strong> {firstName} {lastName}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Street:</strong> {street}
        </p>
        <p>
          <strong>City / Province:</strong> {city}, {province}
        </p>
        <p>
          <strong>Postal Code:</strong> {postalCode}
        </p>
        <p>
          <strong>Country:</strong> {country}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </>
    );
  };

  const handleStatusChange = async (e, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: e.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.error(error);
      toast.error(response.data.message);
    }
  };

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-teal text-center mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 flex-grow flex items-center justify-center">
          No orders found.
        </p>
      ) : (
        <div className="w-full max-w-7xl space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-6">
              {/* Top row with Order #, date, and status dropdown */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-4">
                {/* Order ID & Date */}
                <div>
                  <h2 className="text-xl font-semibold text-teal">
                    Order # {order._id.slice(-6).toUpperCase()}
                  </h2>
                  <span className="text-gray-500">
                    Placed on: {formatDate(order.date)}
                  </span>
                </div>

                {/* Status Dropdown */}
                <div>
                  <label
                    className="mr-2 font-semibold text-gray-700"
                    htmlFor={`status-${order._id}`}
                  >
                    Status:
                  </label>
                  <select
                    id={`status-${order._id}`}
                    value={order.status}
                    onChange={(e) => handleStatusChange(e, order._id)}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Grid layout for main details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Left column */}
                <div>
                  <p>
                    <strong>User ID:</strong> {order.userId}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.paymentMethod === "cod"
                      ? "Cash on Delivery"
                      : order.paymentMethod}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {order.payment ? "Paid" : "Not Paid"}
                  </p>
                </div>

                {/* Right column */}
                <div>
                  <p>
                    <strong>Amount:</strong> ${Number(order.amount).toFixed(2)}
                  </p>
                  <p>
                    <strong># of Items:</strong> {order.items?.length || 0}
                  </p>
                </div>
              </div>

              {/* Items Section with more space */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-teal mb-2">Items</h3>
                <ul className="space-y-1 pl-5 list-disc">
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name || "Unnamed Item"}{" "}
                      {item.quantity ? (
                        <span className="text-gray-600">x {item.quantity}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Address block */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium text-teal mb-2">
                  Shipping Address
                </h3>
                {renderAddress(order.address)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
