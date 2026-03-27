import { Router } from "express";
import { CreateAPI } from "../controller/api.js";
import { APIcheck } from "../middleware/api.js";

const apiRouter = Router();

apiRouter.post("/users/:id/apikey",APIcheck, CreateAPI);

export default apiRouter