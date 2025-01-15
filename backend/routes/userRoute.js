import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  getUserInfo,
  sendContactEmail,
} from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.get("/info", auth, getUserInfo);
userRouter.post("/contact", sendContactEmail);

export default userRouter;
