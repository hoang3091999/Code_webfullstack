import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    role: String,
    isDelete: Boolean,
    permissions: [String]
})

const userModel = mongoose.model("user", userSchema);

export default userModel;