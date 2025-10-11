import Link from 'next/link';
import Image from 'next/image';
import { Session } from 'next-auth'; // ← Import type

import { Button } from './ui/button';
import { signOut } from '@/auth';

interface HeaderProps {
    session: Session | null;
}
function Header({ session }: HeaderProps) {
    console.log(session);
    return (
        <header className="my-10 flex justify-center gap-5">
            <Link href="/">
                <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={40}
                    height={40}
                />
            </Link>
            <ul className="flex flex-row items-center gap-8">
                {session ? (
                    <li>
                        <form
                            action={async () => {
                                'use server';
                                await signOut({ redirectTo: '/' });
                            }}
                            className="mb-10"
                        >
                            <Button>Logout</Button>
                        </form>
                    </li>
                ) : (
                    <li>
                        <Link href="/sign-in">
                            <Button>Login</Button>
                        </Link>
                    </li>
                )}
            </ul>
        </header>
    );
}

export default Header;
