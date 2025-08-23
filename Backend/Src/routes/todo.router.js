import express from "express";
const todoRouter = express.Router();
import createTodo from "../utils/create.todo.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import createTodoSchema from "../schemas/create.todo.schema.js";
import logger from "../config/logger.js";
import userModel from "../models/user.model.js";
import todoModel from "../models/todo.model.js";
import { success } from "zod";

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

todoRouter.get("/todos", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await todoModel.find({ user: userId });
    if (todos.length === 0) {
      logger.info(`No todos found for user ${req.user.email}`);
      res.status(404).json({ success: false, message: "No todos found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Sent all todos", todos: todos });
    logger.info(`Sent all todos to the user - ${req.user.email}`);
  } catch (error) {
    logger.error(`Error while sending all todos - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

todoRouter.get("/todo/:id", isAuthenticated, async (req, res) => {
  try {
    const _id = req.params.id;
    const todo = await todoModel.findOne({ _id });
    if (!todo) {
      logger.info(`No todo found for user - ${req.user.email} for id ${_id}`);
      res.status(404).json({ success: false, message: "No todo found" });
      return;
    }
    res.status(200).json({ success: true, message: "Found Todo", todo: todo });
  } catch (error) {
    logger.error(`Error while sending todo error - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default todoRouter;
