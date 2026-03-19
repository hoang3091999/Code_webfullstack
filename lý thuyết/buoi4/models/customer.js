import mongoose from "mongoose";

// định nghĩa cấu trúc dữ liệu của document - của 1 bản ghi dữ liệu
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    gender: String,
    dob: Date
});
// tham số đầu tiên là tên của collection - tên của mảng
// tham số thứ 2 là schema 
const Customer = mongoose.model("Customer", customerSchema);

export default Customer;