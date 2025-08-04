import z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Alamat email tidak valid.',
  }),
  password: z.string().min(6, {
    message: 'Password harus minimal 6 karakter.',
  }),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
