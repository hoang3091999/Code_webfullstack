import express from "express";
import { createPostMiddleware, ValidateApiKey } from "../middleware/post.js";
import { createPost } from "../controller/post.js";

const Postrouter = express.Router();

Postrouter.post("/post", ValidateApiKey, createPostMiddleware,createPost);

export default Postrouter;