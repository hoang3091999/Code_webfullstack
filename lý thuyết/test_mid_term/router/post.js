import express from "express";
import { createPostMiddleware, ValidateApiKey } from "../middleware/post.js";
import { createPost, UpdatePost } from "../controller/post.js";

const Postrouter = express.Router();

Postrouter.post("/posts", ValidateApiKey, createPostMiddleware,createPost);

Postrouter.post("/posts/:_id", ValidateApiKey, UpdatePost);

export default Postrouter;