import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import paypal from "@paypal/paypal-server-sdk";

// global variables
const currency = "cad";
//const deliveryCharge = 10;

// Gateway initalize for Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Updated PayPal configuration
let environment;
let paypalClient;

try {
  const clientId = process.env.PAYPAL_CLIENT_ID?.trim();
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials are missing");
  }

  // Always use sandbox for testing
  environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  paypalClient = new paypal.core.PayPalHttpClient(environment);

  // Verify client is working
  console.log("PayPal client initialized successfully");
} catch (error) {
  console.error("PayPal Setup Error:", error);
}

// Placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "cod",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Placing order using Paypal method
const placeOrderPaypal = async (req, res) => {
  try {
    if (!environment || !paypalClient) {
      throw new Error("PayPal is not properly configured");
    }

    const { userId, items, amount, address } = req.body;

    if (!userId) {
      throw new Error("User ID is required");
    }

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "PayPal",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency.toUpperCase(),
            value: amount.toFixed(2),
          },
        },
      ],
      application_context: {
        return_url: `${req.headers.origin}/verifyPayPal?success=true&orderId=${newOrder._id}`,
        cancel_url: `${req.headers.origin}/verifyPayPal?success=false&orderId=${newOrder._id}`,
      },
    });

    const response = await paypalClient.execute(request);
    console.log("PayPal order created successfully");

    res.json({
      success: true,
      approvalUrl: response.result.links.find((link) => link.rel === "approve")
        .href,
    });
  } catch (error) {
    console.error("PayPal Order Creation Error:", {
      message: error.message,
      stack: error.stack,
      details: error.details || "No additional details",
    });

    res.status(500).json({
      success: false,
      message: "Failed to create PayPal order: " + error.message,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Placing order using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, deliveryCharge } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verifyStripe?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verifyStripe?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyStripePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Add PayPal verification endpoint
const verifyPaypalPayment = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order Status (Admin only)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const clearFailedPayment = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const result = await orderModel.deleteMany({
      userId,
      payment: false,
      paymentMethod: { $in: ["Stripe", "PayPal"] },
    });

    if (result.deletedCount > 0) {
      res.json({
        success: true,
        message: `Cleared ${result.deletedCount} failed payment(s)`,
      });
    } else {
      res.json({
        success: true,
        message: "No failed payments found",
      });
    }
  } catch (error) {
    console.error("Clear Failed Payment Error:", error);
    res.status(500).json({
      success: false,
      message: "Error clearing failed payments: " + error.message,
    });
  }
};

export {
  placeOrder,
  placeOrderPaypal,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripePayment,
  verifyPaypalPayment,
  clearFailedPayment,
};
