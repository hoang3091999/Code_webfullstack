import express from "express";
import axios from "axios";

const app = express();
const JSON_SERVER_URL = "http://localhost:3000";
const PORT = 8080;
app.use(express());

app.get("/customers", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/customers`);
    const result = {
      message: "dữ liệu khách hàng",
      data: response.data,
    };
    res.send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "không lấy được danh sách khách hàng",
      error: error.message,
    });
  }
});
app.get("/customers/:id", async (req, res) => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/customers`);
    const { id } = req.params;
    const customers = response.data;
    const filtercustomer = customers.find((customer) => customer.id === id);
    if (!filtercustomer) {
      throw new Error("khách hàng chưa có id");
    }
    const result = {
      message: ` khách hàng ${id} : `,
      data: filtercustomer,
    };
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
app.get("/customers/:customerid/orders", async (req, res) => {
  try {
    const customers = await axios.get(`${JSON_SERVER_URL}/customers`);
    const orders = await axios.get(`${JSON_SERVER_URL}/orders`);
    const { customerid } = req.params;
    const filtercustomer = customers.data.find(
      (customer) => customer.id === customerid,
    );

    if (!filtercustomer) {
      throw new Error("khách hàng chưa có id");
    }
    const filterorder = orders.data.filter(
      (order) => order.customerId === filtercustomer.id,
    );
    if (filterorder.length === 0) {
      return res.send({
        message: "khách hàng chưa có orders",
        data: [],
      });
    }
    const result = {
      message: ` thành công lấy được danh sách orders của khách hàng có id: ${customerid} `,
      data: filterorder,
    };
    res.send(result);
  } catch (error) {
    res.status(505).send(error.message);
  }
});
app.get("/orders/highvalue", async (req, res) => {
  try {
    const orders = await axios.get(`${JSON_SERVER_URL}/orders`);
    const filteorders = orders.data.filter(
      (order) => order.totalPrice > 10000000,
    );
    if (filteorders.length === 0) {
      return res.send("không có đơn hàng trên 10 triệu");
    }
    const result = {
      message: "danh sách đơn hàng trên 10 triệu",
      data: filteorders,
    };
    res.send(result);
  } catch (error) {
    res.status(505).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
