import { createUser, Login } from "../controller/user.js";
import { createUserMiddleware, LoginMiddleware } from "../middleware/user.js";
import express from "express";

const Userrouter = express.Router();

Userrouter.post("/register", createUserMiddleware, createUser);

Userrouter.post("/login", LoginMiddleware, Login);

export default Userrouter;
