'use client';
import AuthForm from '@/components/AuthForm';
import { signInSchema } from '@/lib/validation';

const Page = () => {
    return (
        <AuthForm
            type="SIGN_IN"
            schema={signInSchema}
            defaultValues={{
                email: '',
                password: '',
            }}
            onSubmit={async (data) => {
                console.log('sign in', data);
                return { success: true };
            }}
        />
    );
};

export default Page;
