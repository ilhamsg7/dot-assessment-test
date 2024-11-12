import { Router } from "express";
import "./container.register"; 
import "reflect-metadata";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import postRouter from "./routes/post.routes";

const router = Router();
router.use('/auth', authRouter);
router.use('/', userRouter);
router.use('/', postRouter);

export default router;