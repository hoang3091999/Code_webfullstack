import UserModel from "../models/user.js";
import bycrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bycrypt.hashSync(password, 10);
    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const CurrentUser = await UserModel.findOne({ email });
    if (!CurrentUser) throw new Error("user chưa đăng ký");
    const isPasswordValid = bycrypt.compareSync(password, CurrentUser.password);
    if (!isPasswordValid) throw new Error("wrong password");
    res.status(200).send({
      mesage: "user logged successfully",
      CurrentUser,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
