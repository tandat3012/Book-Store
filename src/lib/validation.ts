import { z } from 'zod';
import { useForm } from 'react-hook-form';
export const signUpSchema = z.object({
    fullName: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.email(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty('University Card is required'),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const signInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});
