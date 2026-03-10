// // import { sum } from "./test.js";
// // console.log("Hello world");
// // console.log(sum(1, 2));

// import http from "http" // sử dụng module http được xây dựng và tích hợp sẳn trong node.js
// const app = http.createServer((request, response) => {
    //không đc phép sai thứ tự 2 tham số
    //callback này là nới tạo ra quy định request và response
    //request - là tham số chứ thông tin client yêu cầu
    //response - là tham số server dúng để trả về client
//     response.end("xin chào các bạn")
// }); // phương thức khởi tạo server với http

// app.listen(8080, () => {
//     //function này sẽ được thực thi khi server bắt đầu lắng nghe ở port 8080
//     //khi chạy thành công trên cổng 8080
//     console.log("Server is running on port 8080")
// })
import http from "http"
import students from "./data.js"
// const http = require("http");

const app = http.createServer((request, response) => {
    const url = request.url
    const method = request.method // phương thức hay cách thức gọi api
    if (url === "/students") {
        // nếu như client request tới /students thì server sẽ trả về danh sách học sinh
        if (method === "GET")
        response.end(JSON.stringify(students)) // chuyển đổi dữ liệu sang string
        return; //dừng logic thực thi
    }
    response.end("xin chào các bạn");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
});