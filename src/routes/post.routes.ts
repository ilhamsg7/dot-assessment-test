import { Router } from "express";
import PostController from "../controller/PostController";
import "reflect-metadata";
import { container } from "tsyringe";

const postController = container.resolve(PostController);
const postRouter = Router();

postRouter.get("/posts", (req, res) => postController.index(req, res));
postRouter.get("/posts/:id", (req, res) => postController.show(req, res));
postRouter.post("/posts", (req, res) => postController.create(req, res));
postRouter.put("/posts/:id", (req, res) => postController.update(req, res));
postRouter.delete("/posts/:id", (req, res) => postController.delete(req, res));

export default postRouter;