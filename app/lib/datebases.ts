import fs from "fs";
import path from "path";
import mongoose from "mongoose";

const loadEnvFile = () => {
  const envPaths = [
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "app/.env"),
  ];

  for (const envPath of envPaths) {
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf8");
      content.split(/\r?\n/).forEach((line) => {
        const match = line.match(/^([^=]+)=([\s\S]*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      break;
    }
  }
};

loadEnvFile();

const MONGO_URI = process.env.MONGOURI || process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGOURI or MONGO_URI environment variable");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _mongooseCache: MongooseCache | undefined;
}

if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null };
}

const connectDB = async () => {
  const cache = global._mongooseCache as MongooseCache;

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGO_URI).then(() => mongoose);
  }

  cache.conn = await cache.promise;
  console.log("DB Online");
  return cache.conn;
};

export default connectDB;
