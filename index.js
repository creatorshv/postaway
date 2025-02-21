import "./src/lib/env.js";
import express from "express";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Postaway.");
});

app.listen(PORT, () => {
  console.log(`Server is listening at port: ${PORT}`);
});
