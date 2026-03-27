import express from "express";
import mongoose from "mongoose";
import { createProduct } from "./controllers/product.js";
import { createProductMiddleWare } from "./middleware/product.js";
import ProductRouter from "./routes/product.js";
import { createCustomerMiddleware } from "./middleware/customer.js";
import { CreateCustomer, GetCustomer } from "./controllers/customer.js";
import CustomerRouter from "./routes/customer.js";
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
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/products",createProductMiddleWare, createProduct)
app.use("/api", ProductRouter)

app.use("/api", CustomerRouter);
app.post("/customers", createCustomerMiddleware, CreateCustomer);
app.get("/customers",GetCustomer)


app.listen(8080, () => {
  "server is running on port 8080";
});
