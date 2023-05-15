import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";


export const jwtAuth: RequestHandler = async (req, res, next) => {
    const token= (req.headers["x-access-token"] || req.headers["authorization"]) as string;

    if (token) {

        try {
            const data: any = jwt.verify(token, process.env.TOKEN_KEY);
            const user = await User.findOne({ address: data.user.address });
            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
    } else {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }
}