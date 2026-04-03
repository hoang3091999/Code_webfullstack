import User from "../model/user.js";
import bcrypt from "bcrypt";

export const createUserMiddleware = async(req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
    }
    const exitsEmail = await User.findOne({ email });
    if (exitsEmail) {
      return res.status(400).json({ message: "Email đã tồn tại" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const LoginMiddleware = async(req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng cung cấp đầy đủ thông tin" });
        }
        const exitsEmail = await User.findOne({ email });
        if (!exitsEmail) {
            return res.status(400).json({ message: "Email không tồn tại" });
        }
        const isPasswordValid = bcrypt.compareSync(password, exitsEmail.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Mật khẩu không chính xác" });
        }
        next();
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}
