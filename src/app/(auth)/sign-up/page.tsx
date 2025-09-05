'use client';
import AuthForm from '@/components/AuthForm';
import { signUpSchema } from '@/lib/validation';
const Page = () => {
    return (
        <AuthForm
            type="SIGN_UP"
            schema={signUpSchema}
            defaultValues={{
                email: '',
                password: '',
                fullName: '',
                universityId: 0,
                universityCard: '',
            }}
            onSubmit={async (data) => {
                console.log('sign in', data);
                return { success: true };
            }}
        />
    );
};

export default Page;
