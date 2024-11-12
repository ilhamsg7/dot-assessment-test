import { Router } from "express";
import AuthController from "../controller/AuthController";
import "reflect-metadata";
import { container } from "tsyringe";

const authController = container.resolve(AuthController);
const authRouter = Router();

authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.post('/register', (req, res) => authController.register(req, res));

export default authRouter;