'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

function Header() {
    const pathname = usePathname();
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
                <li>
                    <form className="mb-10">
                        <Button>Logout</Button>
                    </form>
                </li>
            </ul>
        </header>
    );
}

export default Header;
