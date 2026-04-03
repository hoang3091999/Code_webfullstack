import User from "../model/user.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).send({ mesage: "đăng ký thành công", data: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const randomString = crypto.randomBytes(16).toString("hex");
    const generateApiKey = `mern-${user._id}$-${user.email}$-${randomString}`;
    user.apikey = generateApiKey;
    await user.save();
    res.status(200).json({ message: "Đăng nhập thành công", apiKey: generateApiKey });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
