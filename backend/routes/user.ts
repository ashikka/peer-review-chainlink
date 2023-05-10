import express from "express";
import { ethers } from "ethers";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  const data: any = jwt.verify(token, process.env.TOKEN_KEY);
  const user = await User.findOne({ address: data.user.address });
  res.status(201).json(user);
});

router.post("/register", async (req, res) => {
  const { address, name, email, signature } = req.body;

  if (
    ethers.utils.verifyMessage(
      "Click sign below to authenticate with Peer Review :)",
      signature
    ) === address
  ) {
    const user = new User({
      address,
      name,
      email,
    });
    await user.save();
    return res.json(user);
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid signature",
    });
  }
});

router.post("/login", async (req, res) => {
  const { address, signature } = req.body;
  const user = await User.findOne({ address });
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }

  if (
    ethers.utils.verifyMessage(
      "Click sign below to authenticate with Peer Review :)",
      signature
    ) === address
  ) {
    const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
      expiresIn: "2h",
    });

    return res.status(201).json({ token });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid signature",
  });
});

router.get("/:address", async (req, res) => {
  const { address } = req.params;
  const user = await User.findOne({ address });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
});

export default router;
