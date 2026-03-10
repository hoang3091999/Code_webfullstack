import http from "http";
import url from "url";
import { customers, orders, products } from "./data.js";

const app = http.createServer((request, response) => {
  const RequestUrl = request.url;
  const method = request.method;

  if (RequestUrl === "/customers") {
    if (method === "GET") {
      response.end(JSON.stringify(customers));
      return;
    }
  }
  if (RequestUrl.startsWith("/customers")) {
    const splitcustomer = RequestUrl.split("/");
    if (splitcustomer.length === 3) {
      const customerId = splitcustomer[2];
      const customer = customers.find((c) => c.id === customerId);
      if (customer) {
        response.end(JSON.stringify(customer));
        return;
      } else {
        response.end("customer not found");
        return;
      }
    }
    if (splitcustomer.length === 4) {
      const customerId = splitcustomer[2];
      if (splitcustomer[3] === "orders") {
        const customerOrders = orders.filter(
          (item) => item.customerId === customerId,
        );
        response.end(JSON.stringify(customerOrders));
        return;
      }
      return;
    }
    if (splitcustomer.length === 5) {
      const customerId = splitcustomer[2];
      if (splitcustomer[3] === "orders") {
        const orderId = splitcustomer[4];
        if (splitcustomer[4] === "highvalue") {
          const highValueOrders = orders.filter(
            (item) => item.totalPrice > 10000000,
          );
          response.end(JSON.stringify(highValueOrders));
          return;
        }
      }
    }
  }
  if (RequestUrl.startsWith("/products")) {
    const parsedUrl = url.parse(RequestUrl, true);
    const minPrice = parsedUrl.query.minPrice;
    const maxPrice = parsedUrl.query.maxPrice;

    if (!minPrice || !maxPrice) {
      response.end(JSON.stringify(products));
      return;
    }

    const filteredProduct = products.filter(
      (item) =>
        item.price >= Number(minPrice) && item.price <= Number(maxPrice),
    );
    response.end(JSON.stringify(filteredProduct))
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
