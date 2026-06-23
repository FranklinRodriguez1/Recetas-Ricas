import mongoose, { Schema, Document, Model } from 'mongoose';
import connectDB from '@/app/lib/datebases';

export interface FavoriteDocument extends Document {
  userId: mongoose.Types.ObjectId;
  recipeId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema: Schema<FavoriteDocument> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  collection: 'favorites',
});

const Favorite: Model<FavoriteDocument> =
  mongoose.models.Favorite || mongoose.model<FavoriteDocument>('Favorite', FavoriteSchema, 'favorites');

export async function getFavoriteModel() {
  await connectDB();
  return Favorite;
}

export default Favorite;
