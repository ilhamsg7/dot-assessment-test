import express from "express";
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import rateLimit from "express-rate-limit";
import router from "./route";
import "./container.register"; 
import { env } from "./env";
import helmet from "helmet";
import hpp from "hpp";
import cookieParser from "cookie-parser";


const app = express();

app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 1000,
      message: "Too many request, please try again later",
    })
  );

app.use(express.json());

app.use(helmet()); // For HTTP Header Security
app.use(hpp()); // For HTTP Parameter Pollution
app.use(cookieParser()); // For parsing cookies
app.use(
  cors({
    origin: env.ALLOWED_CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);
app.use("/", router);

app.listen(env.PORT, () => {
  console.log(`Example app listening at http://localhost:${env.PORT}`);
});
console.log(env.PORT);