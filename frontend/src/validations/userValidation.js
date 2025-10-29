import { z } from 'zod';

export const signInSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    email: z.email({ message: 'Invalid email address' })
        .refine((email) => email.endsWith('@gmail.com'), { message: 'Email must be a Gmail address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
})
