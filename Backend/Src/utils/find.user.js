import userModel from "../models/user.model.js";

async function findUser(email) {
  try {
      const user = await userModel.findOne({ email });
      
      return user;
  } catch (error) {
    return `Internal server error - ${error.message}`
  }
}

export default findUser;
