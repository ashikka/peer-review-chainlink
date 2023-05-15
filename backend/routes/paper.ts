import express from 'express';
import PaperModel from '../models/paper';
import { jwtAuth } from './jwtMiddleware';

const router = express.Router();


router.post('/submit', jwtAuth, async (req, res, next) => {
    const { title, abstract, category, address, ipfsHash } = req.body;

    // Add logic to check if paper is deployed on blockchain
    const paper = new PaperModel({
        title,
        abstract,
        category,
        address,
        ipfsHash,
        status: "UNDER_REVIEW",
        user: req.user,
    });

    await paper.save();
    res.json({ paper });
});

router.get('/view/:address', jwtAuth, async (req, res, next) => {
    const { address } = req.params;
    const paper = await PaperModel.findOne({ address });

    if (!paper) {
        return res.status(404).json({
            success: false,
            message: 'Paper not found',
        });
    }

    res.json({ paper });
});

export default router;