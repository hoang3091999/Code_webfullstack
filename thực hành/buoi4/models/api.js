import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    customerId: String,
    email: String,
    randomString: String,
    key: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const API = mongoose.model("API", apiSchema, "api");

export default API;