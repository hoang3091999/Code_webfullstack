import { Router } from "express";
import { createProductMiddleware } from "../middleware/product";
import { creatProduct } from "../controller/product";

const ProductRouter = Router();

ProductRouter.post("/products", createProductMiddleware, creatProduct);

export default ProductRouter;