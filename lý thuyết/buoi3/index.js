import axios from "axios";
import express from "express";

const app = express();
const JSON_server_URL = "http://localhost:3000";
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Xin chào các bạn");
});
//viết api để lấy danh sách user từ json-server
app.get("/users", async (req, res) => {
  const response = await axios.get(`${JSON_server_URL}/users`);
  console.log("response: ", response.data);
  const result = {
    message: "thành công",
    data: response.data,
  };
  res.send(result);
});
//thêm thông tin user vào trong db
app.post("/users", async (req, res) => {
  const { userName, Email } = req.body;
  //cần có ktra dữ liệu đầu vào
  if (!userName || !Email) {
    res.status(404).send({
      message: "thiếu thông tin",
      data: null,
    });
    return;
  }
  const response = await axios.post(`${JSON_server_URL}/users`, {
    userName,
    Email,
  });
  const result = {
    message: "thêm mới thành công",
    data: response.data,
  };
  res.status(201).send(result);
});
app.post("/register", (req, res) => {
  try {
    const { userName, email, passWord } = req.body;
    // kiểm tra dữ liệu đầu vào nhận từ body
    if (!userName) throw new Error("userName is required!");
    if (!email) throw new Error("email is required!");
    if (!password) throw new Error("password is required!");

    const newUser = users.push({
      userName,
      email,
      passWord,
    });
    res.status(201).send({
      data: newUser,
      success: true,
      error: "Đăng ký tài khoản thành công",
    });
  } catch (error) {
    res.status(403).send({
      data: null,
      success: false,
      error: error.message,
    });
  }
});
app.listen(8080, () => {
  console.log("server is running");
});
