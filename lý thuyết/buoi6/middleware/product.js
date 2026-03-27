import UserModel from "../models/User.js";

export const createProductMiddleware = async (req, res, next) => {
  try {
    const { name, importPrice, salePrice, quantity } = req.body;
    const { apiKey } = req.query;

    // Validate dữ liệu
    if (!name || !importPrice || !salePrice || !quantity) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    if (importPrice > salePrice) {
      return res.status(400).json({
        message: "Import price must be less than sale price",
      });
    }

    // Kiểm tra quyền
    const currentUser = await UserModel.findById(apiKey);

    if (
      !currentUser ||
      (currentUser.role !== "owner" &&
        !currentUser.permissions.includes("products:create"))
    ) {
      return res.status(401).json({
        message: "Permission deny!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
