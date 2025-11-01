import express from "express";
import { login, signup } from "../controllers/userController.js";
import validationHandler from "../middlewares/validationHandler.js";
import { userAddSchema, userLoginSchema } from "../models/user.js";

const router = express.Router();

router.post("/signup", validationHandler(userAddSchema),signup);
router.post("/login", validationHandler(userLoginSchema), login);

export default router;