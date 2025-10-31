import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routers/userRouter.js"
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRouter);

export default app;