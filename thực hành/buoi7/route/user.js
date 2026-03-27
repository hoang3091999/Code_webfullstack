import { Router } from "express";
import { registerMiddleware } from "../middleware/user.js";
import { login,register } from "../controller/user.js";

const UserRouter = Router();
UserRouter.post("/register",registerMiddleware,register)
UserRouter.post("/login",login)

export default UserRouter;