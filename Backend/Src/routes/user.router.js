import express from "express";
const userRouter = express.Router();

import signupSchema from "../schemas/signup.schema.js";
import signinSchema from "../schemas/signin.schema.js";
import createUser from "../utils/create.user.js";
import checkExistingUser from "../utils/check.existing.user.js";
import generateToken from "../utils/create.token.js";
import findUser from "../utils/find.user.js";
import comparePassword from "../utils/compare.pass.js";
import verifyToken from "../middleware/verifyToken.js";
import logger from "../config/logger.js";


userRouter.post("/signup", async (req, res) => {
  try {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
      const formattedError = parsedData.error.issues.map((err) => {
        return err.message;
      });
      logger.warn("Signup failed: invalid input", { error: formattedError });
      return res.status(400).json({
        success: false,
        message: "Signup failed: invalid input",
        error: formattedError,
      });
    }
    const { name, email, password } = parsedData.data;
    const existingUser = await checkExistingUser(email);
    if (existingUser) {
      logger.warn(`Signup failed: user already exist with email = ${email}`);
      return res
        .status(409)
        .json({ success: false, message: "User already exist!" });
    }
    const newUser = await createUser({ name, email, password });
    const id = newUser._id;
    const token = generateToken({ id, email });
    res.cookie("token", token);
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        user: {
          id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
    logger.info(`User signup: successfull email - ${newUser.email}`);
  } catch (error) {
    logger.error(`Signup error - ${error.message}`, { stack: error.stack });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      const formattedError = parsedData.error.issues.map((err) => {
        return err.message;
      });
      logger.warn("Sign in failed: invalid input", { error: formattedError });
      return res.status(401).json({
        success: false,
        message: "Sign in failed: invalid input",
        error: formattedError,
      });
    }
    const { email, password } = parsedData.data;
    const user = await findUser(email);
    if (!user) {
      logger.warn(`Sign in failed: no user with email - ${email}`);
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }
    const userPassword = user.password;
    const plainPassword = password;
    const passResult = await comparePassword({ userPassword, plainPassword });
    if (!passResult) {
      logger.warn(`Signup failed: wrong password for email - ${email}`);
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
      data: {
        user: {
          id,
          name: user.name,
          email,
        },
      },
    });
    logger.info(`User signed in successfully ${email}`);
  } catch (error) {
    logger.error(`Sign in error - ${error.message} `, { stack: error.stack });
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

userRouter.post("/logout", verifyToken, async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logout successful." });
    logger.info(`User logged out successfully email - ${req.userEmail} `);
  } catch (error) {
    logger.error(`Logout error - ${error.message} `, { stack: error.stack });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default userRouter;
