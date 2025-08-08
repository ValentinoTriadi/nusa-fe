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

export const sessionCompanySchema = z.object({
  id: z.string(),
  userId: z.string(),
  businessId: z.string(),
  storeName: z.string(),
  businessType: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  phoneNumber: z.string(),
  postalCode: z.string().nullable().optional(),
  businessDescription: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type SessionCompany = z.infer<typeof sessionCompanySchema>;

export type SessionUser = z.infer<typeof sessionUserSchema>;
export type Session = z.infer<typeof sessionSchema>;

export interface LoginCredentials {
  email: string;
  password: string;
}
