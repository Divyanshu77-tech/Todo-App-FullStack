import dotenv from "dotenv";
dotenv.config();
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import logger from "../config/logger.js";
import { success } from "zod";
const JWT_SECRET = process.env.JWT_SECRET;

async function isAuthenticated(req, res, next) {
  try {
    const token = req.cookies.token;
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
      logger.info(`User didn't provide the token at ${fullUrl}`);
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    logger.error(
      `User authentication failed at ${fullUrl} erorr - ${error.message} `,
      { stack: error.stack }
    );
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}

export default isAuthenticated;
