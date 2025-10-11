// File: app/api/upload-auth/route.ts
import config from '@/lib/config';
import { getUploadAuthParams } from '@imagekit/next/server';

const {
    env: {
        imagekit: { publicKey, privateKey, urlEndpoint },
    },
} = config;

console.log('ImageKit Config:', { publicKey, privateKey, urlEndpoint });

export async function GET() {
    const { token, expire, signature } = getUploadAuthParams({
        privateKey,
        publicKey,
    });

    return Response.json({
        token,
        expire,
        signature,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
}
