import "./src/lib/env.js";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/lib/dbConfig.js";
import authRouter from "./src/route/auth.routes.js";
import profileRouter from "./src/route/profile.routes.js";
import { applicationErrorHandler } from "./src/lib/error-handler.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", profileRouter);

app.use(applicationErrorHandler);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Postaway.");
});

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
  connectDB();
});
