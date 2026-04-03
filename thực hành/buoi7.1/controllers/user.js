import bcrypt from "bcrypt";
import crypto from "crypto";
import UserModel from "../models/user.js";
import roleModel from "../models/roles.js";
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const HashedPassword = await bcrypt.hash(password, 10);
    const role = await roleModel.findOne({ name: "USER" });
    const User = await UserModel.create({
      name: name,
      email: email,
      password: HashedPassword,
      role: role._id,
    });
    res.status(200).send({ message: "đăng ký khách hàng thành công", User });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    let APIkey = user.apikey
    if (!user.apikey) {
      const randomString = crypto.randomBytes(16).toString("hex");
      user.apikey = ` web-${user._id}$-${user.email}-${randomString}$`;
      await user.save();
    }

    res.status(200).send({ message: "đăng nhập thành công", APIkey });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};
