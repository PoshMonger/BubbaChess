import { type Request, type Response } from 'express';
import User from '../../models/User.ts';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    return res.status(200).json({ token });
};

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(401).json({ message: 'User already exists' });
    }
    const newUser = await User.create({ email, password: await bcrypt.hash(password, 10) });
    if (!newUser) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is not set' });
    }
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string);
    return res.status(200).json({ token });
};