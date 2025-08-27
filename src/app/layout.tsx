import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const ibmPlexSans = localFont({
    src: [
        {
            path: './fonts/IBMPlexSans-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/IBMPlexSans-Medium.ttf',
            weight: '500',
            style: 'normal',
        },
        {
            path: './fonts/IBMPlexSans-SemiBold.ttf',
            weight: '600',
            style: 'normal',
        },
        {
            path: './fonts/IBMPlexSans-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
});
const bebasNeue = localFont({
    src: [
        {
            path: './fonts/BebasNeue-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--bebas-neue',
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'BookWise',
    description: 'Universal Book Management System',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`${ibmPlexSans.className} ${bebasNeue.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
};
export default RootLayout;
