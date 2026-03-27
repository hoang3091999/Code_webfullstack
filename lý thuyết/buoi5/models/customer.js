import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    email: String
})

const customerModel = mongoose.model("Customer", customerSchema);

export default customerModel;