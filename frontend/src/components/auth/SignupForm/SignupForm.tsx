"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import styles from './SignupForm.module.css';

interface Errors {
    displayName?: string;
    email?: string;
    password?: string;
    general?: string;
}

export const SignupForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form and Error State
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Errors>({});
    const [agreed, setAgreed] = useState(false);

    // Password Strength
    const [strength, setStrength] = useState(0);

    const validate = (): boolean => {
        const newErrors: Errors = {};
        const { displayName, email, password } = formData;

        // Name: Min 3 characters
        if (displayName.trim().length < 3) {
            newErrors.displayName = "Name must be at least 3 characters long";
        }

        // Email: Valid format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
        }

        // Password: Min 8 chars, 1 letter, 1 number, 1 special char
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (!hasLetter) {
            newErrors.password = "Password must contain at least one letter";
        } else if (!hasNumber) {
            newErrors.password = "Password must contain at least one number";
        } else if (!hasSpecial) {
            newErrors.password = "Password must contain at least one special character";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const { password } = formData;
        let score = 0;
        if (password.length > 0) score += 10;
        if (password.length >= 8) score += 20;
        if (/[A-Za-z]/.test(password)) score += 20;
        if (/[0-9]/.test(password)) score += 20;
        if (/[^A-Za-z0-9]/.test(password)) score += 30;
        setStrength(Math.min(100, score));
    }, [formData.password]);

    const getStrengthColor = () => {
        if (strength < 40) return '#ff4d4d'; // Red
        if (strength < 80) return '#ffaa00'; // Orange
        return '#00cc66'; // Green
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user types
        if (errors[name as keyof Errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validate()) return;

        if (!agreed) {
            setErrors(prev => ({ ...prev, general: "You must agree to the Terms of Service" }));
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch('/api/proxy/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || "Signup failed");
            }

            router.push('/auth/login?signedUp=true');
        } catch (err: any) {
            setErrors(prev => ({ ...prev, general: err.message || "Something went wrong" }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
            {errors.general && <div className={styles.error}>{errors.general}</div>}

            <Input
                name="displayName"
                label="Display Name"
                type="text"
                placeholder="John Doe"
                value={formData.displayName}
                onChange={handleChange}
                error={errors.displayName}
                required
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                }
            />

            <Input
                name="email"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                }
            />

            <div>
                <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required
                    icon={
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    }
                />
                <div className={styles.strengthMeter}>
                    <div
                        className={styles.strengthBar}
                        style={{ width: `${strength}%`, backgroundColor: getStrengthColor() }}
                    />
                </div>
                <div className={styles.strengthLabel}>
                    {strength < 40 ? 'Weak' : strength < 80 ? 'Medium' : 'Strong'}
                </div>
            </div>

            <div className={styles.terms}>
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                />
                <label htmlFor="terms">
                    I agree to the <Link href="/terms" className={styles.termsLink}>Terms of Service</Link> and <Link href="/privacy" className={styles.termsLink}>Privacy Policy</Link>.
                </label>
            </div>

            <Button type="submit" isLoading={isLoading}>
                Sign Up
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </Button>

            <div className={styles.footer}>
                Already have an account? <Link href="/auth/login" className={styles.link}>Log in</Link>
            </div>
        </form>
    );
};
