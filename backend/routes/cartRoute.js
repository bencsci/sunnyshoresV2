import express from "express";
import {
  addToCart,
  getUserCart,
  updateCart,
  mergeCart,
} from "../controllers/cartController.js";
import auth from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/get", auth, getUserCart);
cartRouter.post("/add", auth, addToCart);
cartRouter.post("/update", auth, updateCart);
cartRouter.post("/merge", auth, mergeCart);

export default cartRouter;
