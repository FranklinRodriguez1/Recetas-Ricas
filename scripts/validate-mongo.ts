import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

function loadEnvFile(): Record<string, string> {
  const envPath = path.resolve(process.cwd(), 'app/.env');
  if (!fs.existsSync(envPath)) {
    throw new Error(`Env file not found: ${envPath}`);
  }

  return fs.readFileSync(envPath, 'utf8').split(/\r?\n/).reduce<Record<string, string>>((env, line) => {
    const match = line.match(/^([^=]+)=([\s\S]*)$/);
    if (!match) return env;
    const key = match[1].trim();
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
    return env;
  }, {});
}

async function main() {
  const env = loadEnvFile();
  const uri = env.MONGO_URI || env.MONGOURI;
  if (!uri) {
    throw new Error('MONGO_URI or MONGOURI is required in app/.env');
  }

  console.log('Using URI:', uri);
  const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const db = conn.connection.db;

  if (!db) {
    throw new Error('MongoDB connection has no db instance');
  }

  console.log('Connected database name:', db.databaseName);

  const collections = await db.listCollections().toArray();
  console.log('Collections found:', collections.map((c) => c.name));

  const recipesCount = await db.collection('recipes').countDocuments();
  console.log('Recipes count:', recipesCount);

  const sampleRecipes = await db.collection('recipes').find().limit(5).toArray();
  console.log('Sample recipes:', sampleRecipes.map((doc) => ({ _id: doc._id?.toString(), nombre: doc.nombre })));

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error('Validation failed:', error);
  process.exit(1);
});
