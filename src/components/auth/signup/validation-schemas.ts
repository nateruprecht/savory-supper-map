
import * as z from 'zod';

export const step1Schema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  surname: z.string().min(1, { message: 'Surname is required' }),
  age: z.string().min(1, { message: 'Age is required' }),
  gender: z.string().min(1, { message: 'Gender is required' }),
  username: z.string().min(3, { message: 'Username must be at least 3 characters' }),
});

export const step2Schema = z.object({
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Please confirm your password' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type Step1FormValues = z.infer<typeof step1Schema>;
export type Step2FormValues = z.infer<typeof step2Schema>;
