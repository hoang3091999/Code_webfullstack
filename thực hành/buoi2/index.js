import express from "express"
import { customers, products, orders } from "./data.js";

const app = express();

app.use(express.json())

app.get("/",(req,res) => {
    res.send("Hello world!")
})
app.get("/products", (req, res) => {
  // Lọc theo tên, khoảng giá (minPrice, maxPrice)
  // Nâng cao: rangePrice = min,max (VD: 1000,100000)
  const { name, minPrice, maxPrice } = req.query;
  let data = products;
  if (name) {
    // lọc danh sách theo tên - lọc theo dạng gần đúng (không phân biệt hoa thường, chứa chuỗi ký tự)
    data = data.filter((item) =>
      item.name.toLowerCase().includes(name.toLowerCase()),
    );
  }
  if (minPrice !== undefined && Number(minPrice) > 0) {
    data = data.filter((item) => item.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && Number(maxPrice) > 0) {
    data = data.filter((item) => item.price <= Number(maxPrice));
  }
  res.send({
    message: "Thành công!",
    data: data,
  });
});
app.listen(8080, () => {
    console.log("server is running")
})