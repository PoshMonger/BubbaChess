import { type Request, type Response } from 'express';
import { User } from '../../models/User.js';

export const getUser = async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'User deleted successfully' });
};