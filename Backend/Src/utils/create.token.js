import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken({ id, email }) {
  const payload = {
    id,
    email,
  };
  try {
    const token = jwt.sign(payload,JWT_SECRET)
    return token;
  } catch (error) {
    return `Token generation error - ${error.message}`
  }
}

export default generateToken;