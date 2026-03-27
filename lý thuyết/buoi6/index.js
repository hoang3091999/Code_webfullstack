import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/User.js";
import userModel from "./models/User.js";
import { creatProduct } from "./controller/product.js";
import { createProductMiddleware } from "./middleware/product.js";
import ProductModel from "./models/product.js";

const app = express();
const port = 8080;
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://hoang3091999:hoang@cluster0.6ivrqov.mongodb.net/?appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const defaultRole = "staff";
    const exittingUser = await UserModel.findOne({ email });
    const exittingPhone = await UserModel.findOne({ phone });
    if (exittingUser || exittingPhone) {
      return res.status(400).send({ message: "Email or phone already exists" });
    }
    const user = await UserModel.create({
      name,
      email,
      phone,
      password,
      role: defaultRole,
    });
    res.status(201).send({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "wrong email" });
    }
    if (user.password !== password) {
      return res.status(201).send({ message: "wrong password" });
    }
    res.status(400).send({ message: "login sucessfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { apiKey } = req.query;
    const currentUser = await UserModel.findById(apiKey);
    if (
      !currentUser ||
      (currentUser.role !== "owner" &&
        !currentUser.permissions.includes("users:read"))
    ) {
      throw new Error("you don't have permission to access this resource");
    }
    const users = await userModel.find();
    res.status(201).send({
      message: "thành công",
      users,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.use("",ProductModel);
app.listen(8080, () => {
  console.log(`Server is running on port ${port}`);
});
