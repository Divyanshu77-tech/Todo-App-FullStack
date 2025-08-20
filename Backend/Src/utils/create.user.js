import userModel from "../models/user.model.js";
import bcyrypt from "bcrypt";

async function createUser({ name, password, email }) {
  const hashedPass = await bcyrypt.hash(password, 10);
  const newUser = await userModel.create({
    name,
    password: hashedPass,
    email,
  });
  return newUser;
}

export default createUser;
