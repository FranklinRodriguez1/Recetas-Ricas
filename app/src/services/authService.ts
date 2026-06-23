import { getUserModel, UserDocument } from '@/app/src/models/userModel';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, password: string): Promise<UserDocument> {
  const User = await getUserModel();
  const hashed = await bcrypt.hash(password, 10);
  const created = await User.create({ email, password: hashed });
  return created as UserDocument;
}

export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  const User = await getUserModel();
  return await User.findOne({ email }).lean() as UserDocument | null;
}

export async function validateUser(email: string, password?: string): Promise<UserDocument | null> {
  const user = await findUserByEmail(email);
  if (!user) return null;
  if (password === undefined) return user;

  const match = await bcrypt.compare(password, (user as any).password);
  return match ? user : null;
}

export default { validateUser, createUser, findUserByEmail };
