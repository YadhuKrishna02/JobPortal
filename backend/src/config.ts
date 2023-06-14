import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
  PORT: process.env.PORT,
  MONGO_DB_URL: process.env.DATABASE as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  GOOGLE_CLOUD_ID: process.env.GOOGLE_CLOUD_ID as string,
  GOOGLE_KEY_SECRET: process.env.GOOGLE_KEY_SECRET as string,
};

export default configKeys;
