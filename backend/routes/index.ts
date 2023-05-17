import express from "express";
import userRouter from "./user";
import paperRouter from "./paper";

const router = express.Router();

router.use("/user", userRouter);
router.use("/paper", paperRouter);

export default router;
