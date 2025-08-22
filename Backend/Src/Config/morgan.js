import morgan from "morgan";
import logger from "./logger.js";

const morganMiddleware = morgan(
  ":method :url :status :response-time ms  :remote-addr",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

export default morganMiddleware;
