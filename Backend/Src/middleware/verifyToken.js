import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Missing authentication token.",
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userEmail = decoded.email;
    req.userId = decoded.id;
    next();
  } catch (error) {
    logger.error(`Token verification failed error - ${error.message}`, {
      stack: error.stack,
    });
    res
      .status(403)
      .json({
        success: false,
        message: "Invalid or expired authentication token",
      });
  }
}

export default verifyToken;
