import mongoose from 'mongoose';
import { ENV } from './env';
import { MongoMemoryServer } from 'mongodb-memory-server';

export const connectDB = async () => {
  try {
    let uri = ENV.MONGO_URI;

    // Use in-memory MongoDB if no explicit cloud URI is provided or we're on localhost default
    if (uri === 'mongodb://localhost:27017/smart-leads' || !uri) {
      console.log('Starting in-memory MongoDB server (Docker/Local DB not found)...');
      const mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};
