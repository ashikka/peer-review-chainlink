import express from "express";
import { ethers } from "ethers";
import User, { UserInterface } from "../models/user";
import jwt from "jsonwebtoken";
import { jwtAuth } from "./jwtMiddleware";
import PaperModel from "../models/paper";
import { getScholarDetails } from "../utils/scholar";

const router = express.Router();

declare global {
  namespace Express {
    interface Request {
      user: UserInterface;
    }
  }
}

router.get("/me", jwtAuth, async (req, res) => {
  res.status(201).json(req.user);
});

router.post("/register", async (req, res) => {
  const { address, signature, scholarUrl } = req.body;

  if (
    ethers.utils.verifyMessage(
      "Click sign below to authenticate with Peer Review :)",
      signature
    ) === address
  ) {

    const scholarDetails = await getScholarDetails(scholarUrl);

    if (!scholarDetails.affiliation.includes(address)) {
      return res.status(401).json({
        success: false,
        message: "You are not affiliated with this scholar",
      });
    }
    const user = new User({
      address,
      name: scholarDetails.name,
      email: scholarDetails.email,
      designation: scholarDetails.affiliation,
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

router.get('/papers', jwtAuth, async (req, res) => {
  const papers = await PaperModel.find({
    user: req.user.address,
  });
  res.json(papers);
})

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
