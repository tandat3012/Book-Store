import { auth } from '@/auth';
import Header from '@/components/Header';
import { redirect } from 'next/navigation';

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();

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
