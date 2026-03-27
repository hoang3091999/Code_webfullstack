import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()

const DB_URL = process.env.DB_URL

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("kết nối MongoDB thành công");
  })
  .catch((err) => {
    console.log("lỗi kết nối", err);
  });

const app = express();
const port = 8080;
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword =  bcrypt.hashSync(password, 10);
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(200).send({ message: "đăng ký thành công", user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(500).send({ message: "không tồn tại user" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(500).send({ message: "email or pass không chính xác" });
    }
    res.status(200).send({ message: "đăng nhập thành công", user });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
