import express from "express";
import {
  placeOrder,
  placeOrderPaypal,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripePayment,
  verifyPaypalPayment,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Routes
orderRouter.post("/place", auth, placeOrder);
orderRouter.post("/paypal", auth, placeOrderPaypal);
orderRouter.post("/stripe", auth, placeOrderStripe);

// User Routes
orderRouter.post("/user-orders", auth, userOrders);

// Verify Payments
orderRouter.post("/verifyStripe", auth, verifyStripePayment);
orderRouter.post("/verifyPayPal", auth, verifyPaypalPayment);
export default orderRouter;
