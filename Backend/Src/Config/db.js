import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

async function connectDb() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connection successful")
  } catch (error) {
    console.log(`DB connection error ${error.message}`);
    process.exit(1)
  }
};

export default connectDb;