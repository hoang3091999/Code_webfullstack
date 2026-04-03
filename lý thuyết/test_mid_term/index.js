import express from "express";
import mongoose from "mongoose";
import Userrouter from "./router/user.js";
import Postrouter from "./router/post.js";

const app = express();
app.use(express.json());
const port = 8080;

mongoose.connect("mongodb://Localhost:27017/test_mid_term")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

app.use("", Userrouter);
app.use("", Postrouter);
app.listen(port, () => {
    console.log(`server chạy trên cổng ${port}`)
})