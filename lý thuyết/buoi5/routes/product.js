import { Router } from "express";
import { createProduct } from "../controllers/product.js";
import { createProductMiddleWare } from "../middleware/product.js";

const ProductRouter = Router();

ProductRouter.post("/products", createProductMiddleWare,createProduct)

export default ProductRouter;