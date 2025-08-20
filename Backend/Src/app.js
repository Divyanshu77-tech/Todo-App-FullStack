import express, { urlencoded } from "express";
const app = express();
import cookieParser from "cookie-parser";

app.use(cookieParser());
app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));

import userRouter from "./routes/user.router.js";

app.use("/api/users/v1", userRouter)

export default app;
