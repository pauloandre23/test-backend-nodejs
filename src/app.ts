import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import productRoutes from "./routes";
import AppError from "./errors/AppError";
import "./infra/typeorm/index";
import "./container/index";
import { errors } from "celebrate";
const app = express();

app.use(cors());
app.use(express.json());

app.use(productRoutes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export { app };
