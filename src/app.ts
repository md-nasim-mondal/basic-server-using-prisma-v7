import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";

const app: Application = express();

// Security & Logging
app.use(helmet());
app.use(morgan("dev"));

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

// Application Routes
app.use("/api/v1", router);

// Test Route
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Basic Server is Running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler (Must be used after routes)
app.use(globalErrorHandler);

// Not Found Handler (Must be the last middleware)
app.use(notFound);

export default app;
