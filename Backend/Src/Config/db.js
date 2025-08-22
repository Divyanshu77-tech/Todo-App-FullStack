import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import logger from "./logger.js";

const MONGO_URI = process.env.MONGO_URI;

async function connectDb() {
  try {
    await mongoose.connect(`${MONGO_URI}Todo-DB`);
    logger.info("DB connection successful");
  } catch (error) {
    logger.error("DB connection failed ", error);
    process.exit(1)
  }
};

export default connectDb;