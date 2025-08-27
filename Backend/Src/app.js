import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import morganMiddleware from "./config/morgan.js";
import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));
app.use(morganMiddleware);

import userRouter from "./routes/user.router.js";
import todoRouter from "./routes/todo.router.js";

app.use("/api/users/v1", userRouter);
app.use("/api/todos/v1", todoRouter);

export default app;
