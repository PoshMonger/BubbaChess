import { Request, Response } from "express";
import User from "../models/User.ts";
import bcrypt from "bcrypt";

export const registerController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });
    return res.status(201).json(newUser);
}