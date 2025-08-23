import express from "express";
const todoRouter = express.Router();
import createTodo from "../utils/create.todo.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import createTodoSchema from "../schemas/create.todo.schema.js";
import logger from "../config/logger.js";
import userModel from "../models/user.model.js";

todoRouter.post("/create", isAuthenticated, async (req, res) => {
  try {
    const validationResult = createTodoSchema.safeParse(req.body);
    if (!validationResult.success) {
      const formattedError = validationResult.error.issues.map((err) => {
        return err.message;
      });
      logger.warn("Todo creation failed in failed: invalid input", {
        error: formattedError,
      });
      return res.status(401).json({ success: false, errors: formattedError });
    }
    const { title, description } = validationResult.data;
    const creator = req.user;
    const newTodo = await createTodo({ title, description, creator });
    const _id = creator.id;
    await userModel.findByIdAndUpdate(_id, { $push: { todos: newTodo._id } });
    res
      .status(201)
      .json({ success: true, message: "Todo created", todo: newTodo });
  } catch (error) {
    logger.error(`Error while creating todo error - ${error.message}`, {
      stack: error.stack,
    });
    res
      .status(500)
      .json({ success: false, message: "Error while creating todo" });
  }
});

export default todoRouter;
