import ProductModel from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
    const { name, price, stock } = req.body;
    if (!name || !price || !stock) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const product = await ProductModel.create({
        name,
        price,
        stock
    })
    res.status(201).send(product)

    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: error.message });
    }
}