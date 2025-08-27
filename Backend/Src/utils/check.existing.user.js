import userModel from "../models/user.model.js";
import logger from "../config/logger.js";

async function checkExistingUser(email) {
  try {
    const existingUser = await userModel.findOne({ email });
    return existingUser;
  } catch (error) {
    logger.error(`Existing user check failed error - ${error.message}`, {
      stack: error.stack,
    });

    throw error;
  }
}

export default checkExistingUser;
