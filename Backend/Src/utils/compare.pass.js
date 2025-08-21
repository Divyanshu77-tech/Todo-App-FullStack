import bcrypt from "bcrypt";

async function comparePassword({ userPassword, plainPassword }) {
  const result = await bcrypt.compare(plainPassword, userPassword);
  return result;
}

export default comparePassword;