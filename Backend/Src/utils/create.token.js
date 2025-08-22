import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../config/logger.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken({ id, email }) {
  const payload = {
    id,
    email,
  };
  try {
    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "10d"});
    logger.info(`Created token for email - ${email}`);
    return token;
  } catch (error) {
    logger.error(`Token generation error - ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
}

export default generateToken;
