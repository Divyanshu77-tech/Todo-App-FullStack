import todoModel from "../models/todo.model.js";
import logger from "../config/logger.js";

async function createTodo({ title, description, creator }) {
  const user = creator.id;
  try {
    const newTodo = await todoModel.create({
      title,
      description,
      user,
    });
    logger.info(`Created todo for user - ${creator.email}`);
    return newTodo;
  } catch (error) {
    logger.error(`Error while creating todo error - ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
}

export default createTodo;