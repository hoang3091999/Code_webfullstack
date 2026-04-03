import User from "../model/user.js";

export const ValidateApiKey = async (req, res, next) => {
  try {
    const { apikey } = req.query;
    if (!apikey) {
      return res.status(401).json({ message: "thiếu apikey" });
    }
    const user = await User.findOne({ apikey });
    if (!user) {
      return res.status(401).json({ message: "apikey không hợp lệ" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPostMiddleware = async (req, res, next) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: "thiếu content" });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};