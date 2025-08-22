import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import logger from "../config/logger.js";

async function createUser({ name, password, email }) {
  try {
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      name,
      password: hashedPass,
      email,
    });
    logger.info(`Created new user for email - ${email}`);
    return {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    };
  } catch (error) {
    logger.error(`User creation error - ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
}

export default createUser;
