# Prisma v7 Express Starter Template

A clean, modular, and reusable basic server starter template built with **Express**, **TypeScript**, and **Prisma v7**.

## 🚀 Features

- **Prisma v7 Integration**: Fully configured for the latest Prisma v7 standards, including multi-file schema support and `prisma.config.ts`.
- **Modular Architecture**: Organized folder structure for scalability and maintainability.
- **Authentication**: Pre-built Authentication system with JWT (Access & Refresh Tokens).
- **Role-Based Access Control (RBAC)**: Support for multiple user roles (SUPER_ADMIN, ADMIN, USER).
- **Zod Validation**: Robust request validation using Zod.
- **Global Error Handling**: Centralized error management with custom `ApiError`.
- **File Upload Support**: Configured with Multer and Cloudinary (optional).
- **Email System**: Integrated with Nodemailer for email verification and password resets.
- **Environment Configuration**: Structured environment variable management using `dotenv`.

## 📁 Project Structure

```
├── prisma/
│   ├── schema/           # Multi-file Prisma schemas
│   │   ├── base.prisma   # Generator and Datasource config
│   │   ├── enum.prisma   # Shared enums
│   │   └── user.prisma   # User model
│   └── migrations/       # Database migrations
├── src/
│   ├── app/
│   │   ├── middlewares/  # Express middlewares (auth, globalErrorHandler, etc.)
│   │   ├── modules/      # Resource-based modules (auth, user)
│   │   └── routes/       # Centralized route definitions
│   ├── config/           # Environment and global configuration
│   ├── helpers/          # Helper utilities (jwt, fileUploader, etc.)
│   ├── shared/           # Shared instances (prisma client, etc.)
│   ├── app.ts            # Express application setup
│   └── server.ts         # Server entry point
├── .env.example          # Template for environment variables
├── prisma.config.ts      # Prisma v7 configuration file
└── tsconfig.json         # TypeScript configuration
```

## 🛠️ Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd basic-server-using-prisma-v7
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your details:

```bash
cp .env.example .env
```

### 3. Database Setup

Update `DATABASE_URL` in your `.env` and run:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the Server

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Production mode
npm start
```

## 🔐 API Endpoints

### Auth
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh-token` - Get new access token
- `POST /api/v1/auth/change-password` - Change password (Auth required)

### User
- `GET /api/v1/users/me` - Get my profile
- `PATCH /api/v1/users/update-my-profile` - Update my profile
- `GET /api/v1/users` - Get all users (Admin only)
- `PATCH /api/v1/users/:id/status` - Change user status (Admin only)

## 📄 License

This project is licensed under the ISC License.
