import { eq } from 'drizzle-orm';
import NextAuth, { User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import { db } from '@/database/drizzle';
import { user } from '@/database/schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const users = await db
                        .select()
                        .from(user)
                        .where(eq(user.email, credentials.email as string))
                        .limit(1);

                    if (!users || users.length === 0) {
                        return null;
                    }

                    const foundUser = users[0];

                    const isPasswordValid = await compare(
                        credentials.password as string,
                        foundUser.password,
                    );

                    if (!isPasswordValid) {
                        console.log('Invalid password');
                        return null;
                    }

                    return {
                        id: foundUser.id.toString(),
                        email: foundUser.email,
                        name: foundUser.fullName,
                    };
                } catch (error) {
                    console.error('Error in authorize:', error);
                    return null;
                }
            },
        }),
    ],

    session: { strategy: 'jwt' },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },

    pages: {
        signIn: '/sign-in',
    },
});
