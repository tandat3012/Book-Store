'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/database/drizzle';
import { user } from '@/database/schema';
import { hash } from 'bcryptjs';
import { signIn } from '@/auth';
import { headers } from 'next/headers';
import ratelimit from '../ratelimit';
import { redirect } from 'next/navigation';

export const signUp = async (formData: AuthCredentials) => {
    const { fullName, email, password, universityCard, universityId } =
        formData;

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
        return redirect('/too-fast');
    }
    const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { success: false };
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(user).values({
            fullName,
            email,
            password: hashedPassword,
            universityId,
            universityCard,
        });

        // await sendVerificationEmail(email); // Implement this function as needed
        await signInWithCredentials({ email, password });
        return { success: true };
    } catch (err) {
        console.error('Error during user sign up:', err);
        return { success: false };
    }
};

export const signInWithCredentials = async (
    formData: Pick<AuthCredentials, 'email' | 'password'>,
) => {
    const { email, password } = formData;

    const ip = (await headers()).get('x-forwarded-for') || '127.0.0.1';
    const { success } = await ratelimit.limit(ip);

    if (!success) {
        return redirect('/too-fast');
    }
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result?.error) return { success: false, error: result.error };
        return { success: true };
    } catch (err) {
        console.error('Error during sign in:', err);
        return { success: false, error: 'Error during sign in' };
    }
};
