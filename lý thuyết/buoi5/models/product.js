import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    product: String,
    stock: Number
})

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;