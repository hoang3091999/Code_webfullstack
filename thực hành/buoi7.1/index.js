import mongoose from "mongoose";
import express from "express";
import { Register } from "./controllers/user.js";
import { registerMiddleware } from "./middleware/user.js";
import { seedRole } from "./seeds/seed.js";
import UserRouter from "./routers/user.js";

const app = express();
const port = 8080;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/mindx_buoi7_thuchanh")
  .then(async () => {
    console.log("kết nối mongodb thành công");
    await seedRole();
  })
  .catch((error) => {
    console.log("kết nối mongodb thất bại");
  });

app.use("", UserRouter);

app.listen(port, () => {
  console.log(`kết nối thành công ${port}`);
});
