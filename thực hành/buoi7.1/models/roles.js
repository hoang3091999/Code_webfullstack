import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  permissions: {
    type: [String],
    default: [],
  },
});

const roleModel = mongoose.model("roles", RoleSchema);

export default roleModel;
