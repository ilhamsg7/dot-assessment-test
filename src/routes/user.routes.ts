import { Router } from "express";
import UserController from "../controller/UserController";
import "reflect-metadata";
import { container } from "tsyringe";

const userController = container.resolve(UserController);
const userRouter = Router();

userRouter.get('/users', (req, res) => userController.index(req, res))
userRouter.get('/users/:id', (req, res) => userController.show(req, res))
userRouter.post('/users/', (req, res) => userController.create(req, res))
userRouter.put('/users/:id', (req, res) => userController.update(req, res))
userRouter.delete('/users/:id', (req, res) => userController.delete(req, res))

export default userRouter;