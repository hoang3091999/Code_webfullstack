import express from "express";
import axios from "axios";

const app = express();
const JSON_SERVER_URL = "http://localhost:3000";
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Xin chào");
});

app.get("/customers", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/customers`);
    if (!response) throw new Error("không có khách hàng");
    const result = {
      message: "danh sách khách hàng ",
      data: response.data,
    };
    res.send(result);
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      error: error.message,
    });
  }
});

app.post("/customers", async (req, res) => {
  try {
    const { customername, email, age } = req.body;
    if (!customername) throw new Error("username is required");
    if (!email) throw new Error("email is required");
    if (!age) throw new Error("age is requiered");

    const customer = await axios.get(`${JSON_SERVER_URL}/customers`);
    const filtercustomer = customer.data.find((cus) => { cus.email.toLowerCase() === email.toLowerCase()})
    if (!filtercustomer) {
      throw new Error("email is exist");
    }

    const response = await axios.post(`${JSON_SERVER_URL}/users`, {
      customername,
      email,
      age,
    });
    const result = {
      message: "thêm mới khách hàng thành công",
      data: response.data,
    };
    res.send(result);
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      error: error.message,
    });
  }
});
app.listen(8080, () => {
  console.log("server is running");
});
