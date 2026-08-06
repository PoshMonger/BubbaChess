import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}