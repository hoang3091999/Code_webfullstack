import express from "express";
import mongoose from "mongoose";
import userRouter from "./router/user.js";
import apiRouter from "./router/api.js";


const app = express();
const PORT = 8080;
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mindx-fullstack")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use("/users", userRouter);
app.use("/api", apiRouter);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
