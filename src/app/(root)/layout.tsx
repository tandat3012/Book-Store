import { auth } from '@/auth';
import Header from '@/components/Header';
import { db } from '@/database/drizzle';
import { user } from '@/database/schema';
import { and, eq, ne } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { after } from 'next/server';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

    after(async () => {
        if (!session?.user?.id) return;

        const today = new Date().toISOString().slice(0, 10);
        await db
            .update(user)
            .set({ lastActivityDate: today })
            .where(
                and(
                    eq(user.id, session.user.id),
                    ne(user.lastActivityDate, today),
                ),
            );
    });
    return (
        <main className="root-container">
            <div className=" max-w-7xl mx-auto">
                <Header session={session} />
                <div className="mt-20 pb-20">{children}</div>
            </div>
        </main>
    );
};
export default Layout;
