import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createAdminValidation = z.object({
  password: z.string().min(6),
  admin: z.object({
    name: z.string(),
    email: z.string().email(),
    contactNo: z.string(),
  }),
});


const updateStatusValidation = z.object({
  body: z.object({
    status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED]),
  }),
});

const updateRoleValidation = z.object({
  body: z.object({
    role: z.enum([UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER]),
  }),
});

export const UserValidation = {
  createAdminValidation,
  updateStatusValidation,
  updateRoleValidation,
};