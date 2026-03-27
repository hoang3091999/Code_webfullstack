import { CreateUser, GetUser } from "../controller/user.js";
import { createUserMiddleware } from "../middleware/user.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", createUserMiddleware, CreateUser);

userRouter.get("/",GetUser)

export default userRouter;