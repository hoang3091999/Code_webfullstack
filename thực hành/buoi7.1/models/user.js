import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "roles",
  },
  apikey: {
    type: String,
    unique: true,
  },
});
const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
