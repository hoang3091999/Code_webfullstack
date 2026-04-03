import UserModel from "../models/user.js";
import bcrypt from "bcrypt";

export const registerMiddleware = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) throw new Error("chưa điền tên");
    if (!email) throw new Error("chưa điền email");
    if (!password) throw new Error("chưa điền mật khẩu");
    const exitsemail = await UserModel.findOne({ email });
    if (exitsemail) {
      throw new Error("email đã tồn tại");
    }
    next();
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
};

export const loginMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) throw new Error("mời nhập email");
    if (!password) throw new Error("mời nhập password");
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("sai tên email");
    }
    const validPasswor = bcrypt.compareSync(password, user.password);
    if (!validPasswor) {
      throw new Error("sai password");
    }
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
