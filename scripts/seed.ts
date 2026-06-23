import connectDB from '../app/lib/datebases';
import { createDefaultRecipes } from '../app/src/services/recipeService';
import { getUserModel } from '../app/src/models/userModel';
import { getRecipeModel } from '../app/src/models/recipeModel';
import { getFavoriteModel } from '../app/src/models/favoriteModel';
import bcrypt from 'bcryptjs';

async function main() {
  await connectDB();

  // Create default recipes (idempotent if collection not empty)
  try {
    await createDefaultRecipes();
  } catch (err) {
    // ignore - defaults may already exist
  }

  const User = await getUserModel();
  const Recipe = await getRecipeModel();
  const Favorite = await getFavoriteModel();

  // Create test user
  const testEmail = 'test@example.com';
  let user = await User.findOne({ email: testEmail }).lean();
  if (!user) {
    const hashed = await bcrypt.hash('test1234', 10);
    const created = await User.create({ email: testEmail, password: hashed });
    user = created.toObject();
  }

  // Create some favorites for the test user (first 3 recipes)
  const recipes = await Recipe.find().limit(3).lean();
  if (recipes.length > 0) {
    for (const r of recipes) {
      const exists = await Favorite.findOne({ userId: user._id, recipeId: r._id });
      if (!exists) {
        await Favorite.create({ userId: user._id, recipeId: r._id });
      }
    }
  }
  process.exit(0);
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
