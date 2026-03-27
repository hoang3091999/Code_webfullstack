import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    permission: [String],
    isDeleted: Boolean,
    role: String
})

const User = mongoose.model("User", userSchema, "users");

export default User;