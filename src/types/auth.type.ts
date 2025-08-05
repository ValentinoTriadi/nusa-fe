import { z } from 'zod';

export const sessionUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: z.string().nullable().optional(),
  address: z.string(),
  ownerName: z.string().optional(),
  storeName: z.string(),
  businessId: z.string(),
  businessType: z.string(),
  city: z.string(),
  province: z.string(),
  phoneNumber: z.string(),
});

export const sessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  expiresAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
});

export type SessionUser = z.infer<typeof sessionUserSchema>;
export type Session = z.infer<typeof sessionSchema>;

export interface LoginCredentials {
  email: string;
  password: string;
}
