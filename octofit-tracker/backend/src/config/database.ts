import type { ConnectOptions } from 'mongoose';

// Database configuration for octofit_db and mongoose connection options
const DB_NAME = process.env.MONGO_DB_NAME || 'octofit_db';
const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_URI = process.env.MONGO_URI || `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`;

export const databaseConfig = {
  dbName: DB_NAME,
  mongoUri: MONGO_URI,
  mongooseOptions: {
    dbName: DB_NAME,
    serverSelectionTimeoutMS: 5000,
  } as ConnectOptions,
};
