import express, { urlencoded } from "express";
const app = express();

app.use(express.json({ limit: "18kb" }));
app.use(express.urlencoded({ limit: "18kb", extended: true }));

import userRouter from "./Routes/user.router.js";

app.use("/api/users/v1", userRouter)

export default app;
