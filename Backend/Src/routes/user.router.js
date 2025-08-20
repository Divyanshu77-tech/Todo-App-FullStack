import express from "express";
const userRouter = express.Router();

import signupSchema from "../schemas/signup.schema.js";
import createUser from "../utils/create.user.js";
import checkExistingUser from "../utils/check.existing.user.js";

userRouter.post("/signup", async (req, res) => {
  const parsedData = signupSchema.safeParse(req.body);
  if (!parsedData.success) {
    const formattedError = parsedData.error.issues.map((err) => {
      return err.message;
    });
    return res.status(400).json({ errors: formattedError });
  }
  const { name, email, password } = parsedData.data;
  const existingUser = await checkExistingUser(email);
  if (existingUser) {
    return res.status(409).send("user already exist please signin");
  }
  const newUser = await createUser({ name, email, password });
  res.send(newUser);
});

export default userRouter;
