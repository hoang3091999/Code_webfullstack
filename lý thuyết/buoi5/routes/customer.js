import { Router } from "express";
import { createCustomerMiddleware } from "../middleware/customer.js";
import { CreateCustomer } from "../controllers/customer.js";

const CustomerRouter = Router();

CustomerRouter.post("/customers", createCustomerMiddleware, CreateCustomer);

export default CustomerRouter;