import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const resolveJwtSecret = (): string => {
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required in production');
  }
  // Generate a random secret for development so it is never predictable
  return crypto.randomBytes(32).toString('hex');
};

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/smart-leads',
  JWT_SECRET: resolveJwtSecret(),
  NODE_ENV: process.env.NODE_ENV || 'development',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:80',
};
