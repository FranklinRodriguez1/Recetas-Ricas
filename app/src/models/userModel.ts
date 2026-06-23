import mongoose, { Schema, Document, Model } from 'mongoose';
import connectDB from '@/app/lib/datebases';

export interface UserDocument extends Document {
  email: string;
  password: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  collection: 'users',
});

const User: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema, 'users');

export async function getUserModel() {
  await connectDB();
  return User;
}

export default User;
