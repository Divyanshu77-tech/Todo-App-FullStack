import logger from "../config/logger.js";
import userModel from "../models/user.model.js";

async function findUser(email) {
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      logger.info(`Found user with email - ${email}`);
    } else {
      logger.warn(`No user found with email - ${email}`);
    }
    return user;
  } catch (error) {
    logger.error(`Error while finding user error - ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
}

export default findUser;
