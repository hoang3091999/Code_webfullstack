import UserModel from "../models/user.js";

export const registerMiddleware = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) throw new Error("Name is required!");
    if (!email) throw new Error("Email is required!");
    if (!password) throw new Error("Password is required!");

    if (password.length < 6) 
        throw new Error("password must at least 6 letter")
    const user = await UserModel.findOne({email})
    if  (user) throw new Error ("users exits")
    next()

  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
