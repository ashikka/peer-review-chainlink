import express from 'express';
import { ethers } from "ethers";
import User from '../models/user';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { address, name, email, signature } = req.body;

    if (ethers.utils.verifyMessage("Click sign below to authenticate with DocPublish :)", signature) === address) {
        const user = new User({
            address,
            name,
            email            
        });
        await user.save();
        res.json(user);
    } else {
        res.status(401).json({
            success: false,
            message: "Invalid signature",
        });
    }


})

router.post('/login', async (req, res) => {
    const { address, signature } = req.body;
    const user = await User.findOne({ address });
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not found",
        });
    }

    if (ethers.utils.verifyMessage("Click sign below to authenticate with DocPublish :)", signature) === address) {
        return res.json(user);
    }

    return res.status(401).json({
        success: false,
        message: "Invalid signature",
    });
})

router.get('/:address', async (req, res) => {
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
})

export default router;