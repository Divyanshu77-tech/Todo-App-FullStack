import express, { urlencoded } from "express";
const app = express();
import cookieParser from "cookie-parser";
import { randomUUID } from "crypto";
import morganMiddleware from "./config/morgan.js";

app.use(cookieParser());
app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));
app.use(morganMiddleware);

import userRouter from "./routes/user.router.js";

app.use("/api/users/v1", userRouter);

export default app;
