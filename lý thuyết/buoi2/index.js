import express from "express";
import { customers, orders, products } from "./data.js";
const app = express();
app.use(express.json());

//base api
//cài đặt phương thức get
//khi truy cập đường dẫn http//localhost:8080
app.get("", (req, res) => {
  res.send({ message: "Xin chào các bạn học viên" });
});

app.get("/customers", (req, res) => {
  //tham số truy vấn - query param
  //thiết lập 1 logic lấy ra danh sách customers có tuổi > giá trị cung cấp
  const { greaterAge } = req.query;
  const data = customers.filter((customer) => {
    return Number(greaterAge) > 0 ? customer.age > greaterAge : true;
  });
  res.send({
    data: data,
    message: "Danh sách customer",
  });
});

app.get("/customers/:customid", (req, res) => {
  const { customid } = req.params;
  const findcustomer = customers.find((customer) => customer.id === customid);
  if (!findcustomer) {
    res.send({
      message: "Không tìm thấy khách hàng",
      data: null,
    });
  }
  res.send({
    message: "tìm thấy khách hàng",
    data: findcustomer,
  });
});

app.post("/customers", (req, res) => {
  const data = req.body;

  if (!data.name) {
    res.send({
      message: "Tên khách hàng là bắt buộc",
      data: null,
    });
    return;
  }
  if (!data.email) {
    res.send({
      message: "Email khách hàng là bắt buộc",
      data: null,
    });
    return;
  }
  customers.push(data);
  res.send({
    message: "Thêm khách hàng thành công",
    data: data,
  });
});

app.put("/customers/:customid", (req, res) => {
  const { customid } = req.params;
  const updateData = req.body;
  const findcustomer = customers.find((customer) => customer.id === customid);
  if (!findcustomer) {
    res.send({
      message: "Không tìm thấy khách hàng",
      data: null,
    });
    return;
  }
  for (const key in updateData) {
    if (findcustomer[key] !== undefined) {
      findcustomer[key] = updateData[key];
    }
  }
  res.send({
    data: findcustomer,
    message: "Cập nhật thông tin thành công!",
  });
});

app.delete("/customers/:customid", (req, res) => {
  const { customid } = req.params;

  const findCustomer = customers.findIndex(
    (customer) => customer.id === customid,
  );

  if (findCustomer < 0) {
    res.send({
      message: "Không tìm thấy khách hàng",
    });
    return;
  }
  customers.splice(findCustomer, 1);
  res.send({
    data: findCustomer,
    message: "Xóa dữ liệu thành công",
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
