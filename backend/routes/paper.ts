import express from 'express';
import PaperModel from '../models/paper';
import getBlockchain from '../utils/ethers';
import { jwtAuth } from './jwtMiddleware';
import cron from 'node-cron';
import UserModel from '../models/user';


cron.schedule('*/10 * * * * *', async () => {
    try {
        console.log("Syncing paper statuses with blockchain...");
        const bc = getBlockchain();

        const users = await UserModel.find({});

        for (const user of users) {
            const userContract = await bc.getUser(user.address);

            if (userContract == null) {
                continue;
            }

            const papers = await userContract.getPapers();

            for (const paper of papers) {
                const paperContract = await bc.getPaper(paper);
                const status = await paperContract.status();
                const paperModel = await PaperModel.findOne({ address: paper });

                if (paperModel == null) {
                    // Don't save
                    // const newPaper = new PaperModel({
                    //     address: paper,
                    //     status: status,
                    //     ipfsHash: await paperContract.ipfsHash(),
                    //     user: user.address,
                    // });
                    // await newPaper.save();
                    continue;
                } else {
                    paperModel.status = status;
                    await paperModel.save();
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
});

const router = express.Router();


router.post('/submit', jwtAuth, async (req, res, next) => {
    const { title, abstract, category, address, ipfsHash } = req.body;

    const valid = getBlockchain().checkPaperIsOwnedByUser(address, req.user.address);

    if (!valid) {
        return res.status(401).json({
            success: false,
            message: "Paper not owned by user",
        });
    }

    const existingPaper = await PaperModel.findOne({ address });
    console.log(existingPaper);

    if (existingPaper != null) {
        if (title) {
            existingPaper.title = title;
        }

        if (abstract) {
            existingPaper.abstract = abstract;
        }

        if (category) {
            existingPaper.category = category;
        }
        await existingPaper.save();
        return res.json(existingPaper);
    }

    const paper = new PaperModel({
        title,
        abstract,
        category,
        address,
        ipfsHash,
        status: "UNDER_REVIEW",
        user: req.user.address,
        date: (new Date()).getTime(),
    });

    await paper.save();
    console.log(paper);
    res.json({ paper });
});

router.get('/all', async (req, res, next) => {
    const papers = await PaperModel.find({});
    res.json(papers);
});

router.get('/view/:address', async (req, res, next) => {
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