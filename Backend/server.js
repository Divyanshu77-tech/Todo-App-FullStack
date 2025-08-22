import dotenv from "dotenv";
dotenv.config();
import app from "./Src/app.js";
import connectDb from "./Src/config/db.js";
import logger from "./Src/config/logger.js";
const PORT = process.env.PORT;

async function startServer() {
  try {
    await connectDb();
    app.listen(PORT, () => {
      logger.info(`Server is listening on PORT ${PORT}`);
    });
  } catch (error) {
    logger.error(`Server connection error - ${error.message}`, {stack: error.stack})
  }
}

startServer();