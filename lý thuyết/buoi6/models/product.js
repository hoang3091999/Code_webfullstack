import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    importPrice: Number,
    salePrice: Number,
    quantity: Number,
    isDelete: Boolean,
})

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;