import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import httpStatus from "http-status";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import { config } from "./config";

import { apiLimiter } from "./app/middlewares/rateLimiter";
import { prisma } from "./shared/prisma";

const app: Application = express();

// Security & Logging
app.use(helmet());
// Logging
if (config.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate Limiting
app.use("/api", apiLimiter);

// Parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
app.use(
  cors({
    origin: ["http://localhost:3000", config.CLIENT_URL], // Frontend URL
    credentials: true,
  })
);

// Application Routes
app.use("/api/v1", router);

// Health Check Route
app.get("/health", async (req: Request, res: Response) => {
  try {
    // Check Database Connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.status(httpStatus.OK).json({
      success: true,
      message: "Server is healthy 🚀",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      db_status: "connected",
    });
  } catch (_error) {
    res.status(httpStatus.SERVICE_UNAVAILABLE).json({
      success: false,
      message: "Server is unhealthy ❌",
      timestamp: new Date().toISOString(),
      db_status: "disconnected",
    });
  }
});

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
