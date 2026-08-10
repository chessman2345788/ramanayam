import { z } from "zod";

// ─── Reusable field schemas ──────────────────────────────────────────
const emailField = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Email is required")
  .max(254, "Email is too long") // RFC 5321 maximum
  .email("Invalid email format");

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(128, "Password is too long")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/\d/, "Password must contain at least one digit")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

const phoneField = z
  .string()
  .regex(/^[6-9]\d{9}$/, "Phone must be a valid 10-digit Indian mobile number");

// ─── Schemas ─────────────────────────────────────────────────────────
export const registerSchema = z.object({
  body: z
    .object({
      firstName: z.string().trim().min(1, "First name is required").max(50, "First name is too long"),
      lastName: z.string().trim().min(1, "Last name is required").max(50, "Last name is too long"),
      email: emailField,
      phone: phoneField.optional(),
      password: passwordField,
    })
    .strict(),
});

export const loginSchema = z.object({
  body: z
    .object({
      email: emailField,
      password: z.string().min(1, "Password is required"),
    })
    .strict(),
});

export const forgotPasswordSchema = z.object({
  body: z
    .object({
      email: emailField,
    })
    .strict(),
});

export const resetPasswordSchema = z.object({
  body: z
    .object({
      token: z.string().min(1, "Reset token is required").max(2048, "Invalid reset token"),
      newPassword: passwordField,
    })
    .strict(),
});

export const changePasswordSchema = z.object({
  body: z
    .object({
      oldPassword: z.string().min(1, "Current password is required"),
      newPassword: passwordField,
    })
    .strict(),
});

export const updateProfileSchema = z.object({
  body: z
    .object({
      firstName: z.string().trim().min(1, "First name must not be empty").optional(),
      lastName: z.string().trim().min(1, "Last name must not be empty").optional(),
      phone: phoneField.optional().nullable(),
      profileImage: z.string().url("Invalid image URL format").optional().nullable(),
    })
    .strict(),
});
