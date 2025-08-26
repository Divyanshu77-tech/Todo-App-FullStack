import express from "express";
const todoRouter = express.Router();
import createTodo from "../utils/create.todo.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import createTodoSchema from "../schemas/create.todo.schema.js";
import logger from "../config/logger.js";
import userModel from "../models/user.model.js";
import todoModel from "../models/todo.model.js";
import updateTodoSchema from "../schemas/update.todo.js";
import { success } from "zod";

todoRouter.post("/create", isAuthenticated, async (req, res) => {
  try {
    const validationResult = createTodoSchema.safeParse(req.body);
    if (!validationResult.success) {
      c;
      logger.warn("Todo creation failed in failed: invalid input", {
        error: formattedError,
      });
      return res.status(401).json({ success: false, error: formattedError });
    }
    const { title, description } = validationResult.data;
    const creator = req.user;
    const newTodo = await createTodo({ title, description, creator });
    const _id = creator.id;
    await userModel.findByIdAndUpdate(_id, { $push: { todos: newTodo._id } });
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: { todo: newTodo },
    });
  } catch (error) {
    logger.error(`Error while creating todo error - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Error while creating todo",
      error: error.message,
    });
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
    res.status(200).json({
      success: true,
      message: "Sent all todos",
      data: { todo: todos },
    });
    logger.info(`Sent all todos to the user - ${req.user.email}`);
  } catch (error) {
    logger.error(`Error while sending all todos - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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
    res
      .status(200)
      .json({ success: true, message: "Found Todo", data: { todo: todo } });
  } catch (error) {
    logger.error(`Error while sending todo error - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

todoRouter.patch("/update/:id", isAuthenticated, async (req, res) => {
  try {
    const validationResult = updateTodoSchema.safeParse(req.body);
    if (!validationResult.success) {
      const formattedError = validationResult.error.issues.map((err) => {
        return err.message;
      });
      logger.info(
        `Failed to update todo for user - ${req.user.email} due to invalid input`
      );
      return res.status(401).json({
        success: false,
        message: "Failed to update todo due to invalid input",
        error: formattedError,
      });
    }
    const _id = req.params.id;
    const { title, description } = validationResult.data;
    console.log("description ", typeof description);
    const updateData = {};
    if (title !== "" && title !== undefined) updateData.title = title;
    if (description !== "" && description !== undefined)
      updateData.description = description;
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field (title or description) must be provided",
      });
    }
    const updatedTodo = await todoModel.findByIdAndUpdate(
      _id,
      { $set: updateData },
      {
        new: true,
      }
    );

    logger.info(`Updated todo for user - ${req.user.email}`);
    res.status(200).json({
      success: true,
      message: "Updated todo successfully",
      data: { todo: updatedTodo },
    });
  } catch (error) {
    logger.error(
      `Error while updating todo for user - ${req.user.email} error - ${error.message}`,
      { stack: error.stack }
    );
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

todoRouter.delete("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedTodo = await todoModel.findByIdAndDelete(_id);
    if (!deletedTodo) {
      logger.info(`No todo found for user - ${req.user.email} with id ${_id}`);
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    logger.info(`Delete todo for user - ${req.user.email}`);
    res.status(200).json({ success: true, message: "Deleted todo" });
  } catch (error) {
    logger.error(`Error while deleting todo error - ${error.message}`, {
      stack: error.stack,
    });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default todoRouter;
