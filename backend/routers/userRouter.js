import express from "express";
import { login, signup, googleSignup, verifyEmail, setPassword, forgotPassword, resetPassword } from "../controllers/userController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema, userLoginSchema } from "../models/user.js";

const router = express.Router();

router.post("/signup", validationHandler(userAddSchema),signup);
router.post("/login", validationHandler(userLoginSchema), login);

// Google-first flow
router.post("/google-signup", googleSignup);
router.get("/verify-email", verifyEmail);
router.post("/set-password", setPassword);

// Password reset
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;