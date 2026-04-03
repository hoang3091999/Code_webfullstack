import { Login, Register } from "../controllers/user.js";
import { loginMiddleware, registerMiddleware } from "../middleware/user.js";
import { Router } from "express";

const UserRouter = Router();

UserRouter.post("/register", registerMiddleware, Register);

UserRouter.post("/login", loginMiddleware, Login);

export default UserRouter;
