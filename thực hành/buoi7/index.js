import express, { application } from "express";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import bycrypt from "bcrypt";
import dotenv from "dotenv";
import UserRouter from "./route/user.js";
dotenv.config();

const DB_URL = process.env.DB_URL;

const app = express();
const port = 8080;
app.use(express.json());

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("kết nối thành công mongodb");
  })
  .catch((error) => {
    console.log("kết nối thất bại");
  });
app.use("",UserRouter)
app.listen(port, () => {
  console.log(`kết nối thành công cổng ${port}`);
});
