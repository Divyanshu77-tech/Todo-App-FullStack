import bcrypt from "bcrypt";
import logger from "../config/logger.js"

async function comparePassword({ userPassword, plainPassword }) {
  try {
    const result = await bcrypt.compare(plainPassword, userPassword);
    return result;
  } catch (error) {
    logger.error(`Password comparison failed error - ${error.message}`, {stack: error.stack})
  }
  throw error;
}

export default comparePassword;