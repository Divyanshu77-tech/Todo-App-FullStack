import userModel from "../models/user.model.js";

async function checkExistingUser(email) {
  const existingUser = await userModel.findOne({ email });
  return existingUser ? true : false;
}

export default checkExistingUser;
