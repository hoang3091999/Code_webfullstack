import ProductModel from "../models/product.js";

export const creatProduct = async (req, res) => {
  try {
    const { name, importPrice, salePrice, quantity} = req.body;
    const product = await ProductModel.create({
        name,
        importPrice,
        salePrice,
        quantity,
    });
    res.status(201).send({ message: "Product created successfully", product });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};