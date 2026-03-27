import API from "../models/api.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const APIcheck = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      message: "Không có khách hàng",
    });
  }

  const customer = await User.findById(id);

  if (!customer) {
    return res.status(404).json({
      message: "Không có khách hàng",
    });
  }
  const exitApi = await API.findOne({ customerId: id });
  if (exitApi) {
    return res.status(500).send({ message: "đã có API" });
  }
  next();
};
