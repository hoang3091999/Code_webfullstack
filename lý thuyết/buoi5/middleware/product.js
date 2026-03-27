export const createProductMiddleWare = async (req, res, next) => {
  const { name, price, stock } = req.body;
  if (!name || !price || !stock) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  next();
};
