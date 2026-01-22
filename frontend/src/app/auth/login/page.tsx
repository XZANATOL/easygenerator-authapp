import React from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper/AuthWrapper';
import { LoginForm } from '@/components/auth/LoginForm/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login - EasyGenerator',
    description: 'Login to your account',
};

export default function LoginPage() {
    return (
        <AuthWrapper
            title="Welcome Back"
            subtitle="Sign in to continue to your account"
        >
            <LoginForm />
        </AuthWrapper>
    );
}
