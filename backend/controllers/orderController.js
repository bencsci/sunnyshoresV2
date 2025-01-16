import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import paypal from "@paypal/checkout-server-sdk";

// global variables
const currency = "cad";
const deliveryCharge = 10;

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

  // Log credentials format (safely)
  console.log("Credential Check:", {
    clientIdLength: clientId.length,
    clientSecretLength: clientSecret.length,
    clientIdStart: clientId.substring(0, 4) + "...",
    clientSecretStart: clientSecret.substring(0, 4) + "...",
  });

  // Always use sandbox for testing
  environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
  paypalClient = new paypal.core.PayPalHttpClient(environment);

  // Verify client is working
  console.log("PayPal client initialized successfully");
} catch (error) {
  console.error("PayPal Setup Error:", error);
}

// Add more detailed debug logs
console.log("Node Environment:", process.env.NODE_ENV);
console.log("PayPal Environment Type:", environment?.constructor?.name);
console.log("PayPal Client ID exists:", !!process.env.PAYPAL_CLIENT_ID);
console.log("PayPal Client Secret exists:", !!process.env.PAYPAL_CLIENT_SECRET);

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

    // Calculate the actual item total
    const itemTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Calculate total amount (items + shipping)
    const totalAmount = (itemTotal + deliveryCharge).toFixed(2);

    const orderData = {
      userId,
      items,
      address,
      amount: parseFloat(totalAmount),
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
            value: totalAmount,
            breakdown: {
              item_total: {
                currency_code: currency.toUpperCase(),
                value: itemTotal.toFixed(2),
              },
              shipping: {
                currency_code: currency.toUpperCase(),
                value: deliveryCharge.toFixed(2),
              },
            },
          },
          items: items.map((item) => ({
            name: item.name,
            unit_amount: {
              currency_code: currency.toUpperCase(),
              value: item.price.toFixed(2),
            },
            quantity: item.quantity,
          })),
        },
      ],
      application_context: {
        return_url: `${req.headers.origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${req.headers.origin}/verify?success=false&orderId=${newOrder._id}`,
      },
    });

    const response = await paypalClient.execute(request);

    // Send back the approval URL from PayPal's response
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
      message: "Failed to create PayPal order. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Placing order using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
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
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
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

export {
  placeOrder,
  placeOrderPaypal,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripePayment,
  verifyPaypalPayment,
};
