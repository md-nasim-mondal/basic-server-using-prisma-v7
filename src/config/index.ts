import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig {
  NODE_ENV: "development" | "production";
  PORT: string;
  DATABASE_URL: string;
  CLIENT_URL: string;
  OPEN_ROUTER_API_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  RESET_PASS_LINK: string;
  bcrypt: {
    SALT_ROUND: string;
  };
  jwt: {
    JWT_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRES_IN: string;
    RESET_PASS_SECRET: string;
    RESET_PASS_TOKEN_EXPIRES_IN: string;
  };
  cloudinary: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
  emailSender: {
    EMAIL: string;
    APP_PASS: string;
  };
  ssl: {
    STORE_ID: string;
    STORE_PASS: string;
    SSL_PAYMENT_API: string;
    SSL_VALIDATION_API: string;
    SUCCESS_URL: string;
    CANCEL_URL: string;
    FAIL_URL: string;
  };
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "JWT_SECRET",
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      // eslint-disable-next-line no-console
      console.warn(`⚠️ Missing required environment variable: ${key}`);
      if (key === "DATABASE_URL" || key === "JWT_SECRET") {
        throw new Error(
          `CRITICAL: Missing required environment variable: ${key}`
        );
      }
    }
  });

  return {
    NODE_ENV:
      (process.env.NODE_ENV as "development" | "production") || "development",
    PORT: process.env.PORT || "5000",
    DATABASE_URL: process.env.DATABASE_URL as string,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000",
    OPEN_ROUTER_API_KEY: process.env.OPEN_ROUTER_API_KEY || "",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || "",
    RESET_PASS_LINK: process.env.RESET_PASS_LINK || "",
    bcrypt: {
      SALT_ROUND: process.env.SALT_ROUND || "12",
    },
    jwt: {
      JWT_SECRET: process.env.JWT_SECRET || "secret",
      ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || "1d",
      REFRESH_TOKEN_SECRET:
        process.env.REFRESH_TOKEN_SECRET || "refresh-secret",
      REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
      RESET_PASS_SECRET: process.env.RESET_PASS_SECRET || "reset-secret",
      RESET_PASS_TOKEN_EXPIRES_IN:
        process.env.RESET_PASS_TOKEN_EXPIRES_IN || "10m",
    },
    cloudinary: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
    },
    emailSender: {
      EMAIL: process.env.EMAIL_SENDER_EMAIL || "",
      APP_PASS: process.env.EMAIL_SENDER_APP_PASS || "",
    },
    ssl: {
      STORE_ID: process.env.STORE_ID || "",
      STORE_PASS: process.env.STORE_PASS || "",
      SSL_PAYMENT_API: process.env.SSL_PAYMENT_API || "",
      SSL_VALIDATION_API: process.env.SSL_VALIDATION_API || "",
      SUCCESS_URL: process.env.SUCCESS_URL || "",
      CANCEL_URL: process.env.CANCEL_URL || "",
      FAIL_URL: process.env.FAIL_URL || "",
    },
  };
};

export const config = loadEnvVariables();
