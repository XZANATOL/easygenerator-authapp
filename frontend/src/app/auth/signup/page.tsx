import React from 'react';
import { AuthWrapper } from '@/components/auth/AuthWrapper/AuthWrapper';
import { SignupForm } from '@/components/auth/SignupForm/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Signup - EasyGenerator',
    description: 'Create your account',
};

export default function SignupPage() {
    return (
        <AuthWrapper
            title="Create your account"
            subtitle="Enter your details below to get started with your premium experience."
        >
            <SignupForm />
        </AuthWrapper>
    );
}
