import express from "express";
import { customers, products, orders } from "./data.js";

const app = express();

app.use(express.json());

app.get("/customers", (req, res) => {
  res.send({
    data: customers,
    message: "danh sách khách hàng",
  });
});
app.get("/customers/:id", (req, res) => {
  const { id } = req.params;
  const customerId = customers.find((customer) => customer.id === id);
  if (!customerId) {
    return res.send({
      data: null,
      message: "không có khách hàng",
    });
  }
  res.send({
    data: customerId,
    message: "khách hàng được lọc theo id",
  });
});
app.get("/customers/:id/orders", (req, res) => {
  const { id } = req.params;
  const orderCustomer = orders.filter((order) => order.customerId === id);
  console.log(orders);
  res.send({
    data: orderCustomer,
    message: "khách hàng order được lọc theo id khách hàng",
  });
});
app.get("/orders/highvalue", (req, res) => {
  const highValueOrders = orders.filter((order) => order.totalPrice > 10000000);

  res.send({
    data: highValueOrders,
    message: "Danh sách đơn hàng có giá trị trên 10 triệu",
  });
});
app.get("/products", (req, res) => {
  const { name, MinPrice, MaxPrice } = req.query;
  let data = products;
  if (name) {
    data = data.filter((item) =>
      item.name.toLocaleLowerCase().includes(name.toLowerCase()),
    );
  }
  if (MinPrice !== undefined && Number(MinPrice) > 0) {
    data = data.filter((item) => item.price > MinPrice);
  }
  if (MaxPrice !== undefined && Number(MaxPrice) > 0) {
    data = data.filter((item) => item.price < MaxPrice);
  }
  res.send({
    data: data,
    message: "Thành công",
  });
});
app.post("/customers", (req, res) => {
  const { name, email, age } = req.body;
  const data = customers;
  const id = crypto.randomUUID();
  const ExitEmail = data.find((item) => item.email === email);
  if (ExitEmail) {
    res.send({
      data: null,
      message: "email đã tồn tại",
    });
    return;
  }
  if (!name) {
    res.send({
      data: null,
      message: "tên là bắt buộc",
    });
    return;
  }
  if (!email) {
    res.send({
      data: null,
      message: "email là bắt buộc",
    });
    return;
  }
  if (age === undefined) {
    res.send({
      data: null,
      message: "tuổi là bắt buộc",
    });
    return;
  }
  const NewUser = {
    id: id,
    name: name,
    email: email,
    age: age,
  };
  customers.push(NewUser);
  res.send({
    data: customers,
    message: "thêm thành công",
  });
});
app.post("/orders", (req, res) => {
  const { orderId, customerId, productId, quantity } = req.body;
  const productlist = products;
  const product = productlist.find((item) => {
    return item.id === productId;
  });
  const validcustomer = customers.find(customer => customer.id === customerId)
  if (!validcustomer) {
    return res.send({
      data: null,
      message: "người sử dụng không tồn tại"
    })
  }
  if (!Number.isFinite(Number(quantity)) || Number(quantity) < 1) {
    return res.send({
      data:null,
      message: "số lượng không hợp lệ"
    })
  }
  if (!orderId) {
    return res.send({
      data: null,
      message: "id là bắt buộc"
    })
  }
  if (!product) {
    res.send({
      data: null,
      message: "sản phẩm không tồn tại",
    });
    return;
  }
  if (product.quantity < quantity) {
    res.send({
      data: null,
      message: "sản phẩm không đủ",
    });
    return;
  }
  const totalPrice = Number(quantity) * Number(product.price);
  const NewOrder = {
    id: orderId,
    customerId: customerId,
    productId: productId,
    quantity: quantity,
    totalPrice: totalPrice,
  };
  orders.push(NewOrder);
  res.send({
    data: NewOrder,
    message: "thêm mới order thành công",
  });
});
app.put("/orders/:ID", (req, res) => {
  const { ID } = req.params;
  const { customerId, productId, quantity } = req.body;
  const order = orders.find((order) => order.id === ID);
  if (!order) {
    return res.status(404).send({
      data: null,
      message: "không tìm thấy đơn hàng",
    });
  }
  const selectedproduct = products.find((product) => product.id === productId);
  if (!selectedproduct) {
    return res.status(404).send({
      data: null,
      message: "không tìm thấy sản phẩm",
    });
  }
  if (selectedproduct.quantity < quantity) {
    return res.status(404).send({
      data: null,
      message: "sản phẩm không đủ số lượng",
    });
  }
  const totalPrice = selectedproduct.price * quantity;
  const UpdateOrder = {
    customerId: customerId,
    productId: productId,
    quantity: quantity,
    totalPrice: totalPrice,
  };
  for (const key in UpdateOrder) {
    if (order[key] !== undefined) {
      order[key] = UpdateOrder[key];
    }
  }
  // order.customerId = customerId
  // order.productId = productId
  // order.quantity = quantity
  // order.totalPrice = product.price * quantity
  res.send({
    data: orders,
    message: "cập nhật order thành công",
  });
});
// app.delete("/customers/:id", (req,res) => {
//   const {id} = req.params
//   const findcustomer = customers.findIndex((customer) => customer.id === id)
//   if(findcustomer < 0) {
//     return res.status(404).send({
//       data: null,
//       message: "không tìm thấy khách hàng"
//     })
//   }
//   customers.
//   res.send({
//     data: customers,
//     message: "xóa khách hàng thành công"
//   })
// })
app.delete("/customers/:id", (req,res) => {
  const {id} = req.params
  const customer = customers.find((i) => i.id === id)
  if (!customer) {
    return res.send({
      data: null,
      message: "khách hàng không tồn tại"
    })
  }
  customer.isdelete = true
  res.send({
    data: customer,
    message: "xóa thành công"
  })
})
app.listen(8080, () => {
  console.log("server is running");
});
