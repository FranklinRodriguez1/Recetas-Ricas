import mongoose, { Schema, Document, Model } from 'mongoose';
import connectDB from '@/app/lib/datebases';

export interface RecipeDocument extends Document {
  nombre: string;
  imagen: string;
  tiempoPreparacion: string;
  dificultad: string;
  isFavorite?: boolean;
  preparacion?: string[];
  ingredientes?: string[];
}

const RecipeSchema: Schema<RecipeDocument> = new Schema({
  nombre: { type: String, required: true },
  imagen: { type: String, required: true },
  tiempoPreparacion: { type: String, required: true },
  dificultad: { type: String, required: true },
  isFavorite: { type: Boolean, default: false },
  preparacion: { type: [String], default: [] },
  ingredientes: { type: [String], default: [] },
});

const Recipe: Model<RecipeDocument> =
  mongoose.models.Recipe || mongoose.model<RecipeDocument>('Recipe', RecipeSchema);

export async function getRecipeModel() {
  await connectDB();
  return Recipe;
}

export default Recipe;
