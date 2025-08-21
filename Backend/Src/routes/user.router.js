import express from "express";
const userRouter = express.Router();

// Zod schemas for input validation
import signupSchema from "../schemas/signup.schema.js";
import signinSchema from "../schemas/signin.schema.js";
import createUser from "../utils/create.user.js";
import checkExistingUser from "../utils/check.existing.user.js";
import generateToken from "../utils/create.token.js";
import findUser from "../utils/find.user.js";
import comparePassword from "../utils/compare.pass.js";
import { success } from "zod";

userRouter.post("/signup", async (req, res) => {
  try {
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
    const id = newUser._id;
    const token = generateToken({ id, email });
    res.cookie("token", token);
    res.send(newUser);
  } catch (error) {
    res.send(`Internal server error - ${error.message}`);
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      const formattedError = parsedData.error.issues.map((err) => {
        return err.message;
      });
      return res.status(401).json({ success: false, errors: formattedError });
    }
    const { email, password } = parsedData.data;
    const user = await findUser(email);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const userPassword = user.password;
    const plainPassword = password;
    const passResult = await comparePassword({ userPassword, plainPassword });
    if (!passResult) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const id = user._id;
    const token = generateToken({ id, email });
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "Signin successful",
      user: {
        id,
        name: user.name,
        email,
      },
    });
  } catch (error) {
    console.log(`Signin error - ${error}`)
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default userRouter;
