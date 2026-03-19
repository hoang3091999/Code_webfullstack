import express from "express";
import mongoose from "mongoose";
import Customer from "./models/customer.js";

const app = express();
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
  res.send("Hello World");
});
app.post("/customers", async (req, res) => {
  try {
    const { name, phone, email, address, gender, dob } = req.body;
    if (!name || !phone || !email || !address) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
  } catch (err) {
    return res.status(500).json({ message: err.message, data: null });
  }
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
