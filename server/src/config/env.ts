import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/smart-leads',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret_for_dev',
  NODE_ENV: process.env.NODE_ENV || 'development',
};
