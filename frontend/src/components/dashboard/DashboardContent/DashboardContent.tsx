"use client";

import React, { useEffect, useRef } from 'react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/Button/Button';
import gsap from 'gsap';
import styles from './DashboardContent.module.css';

interface User {
    name?: string | null;
    email?: string | null;
}

export default function DashboardContent({ user }: { user?: User }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const avatarRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(avatarRef.current,
            { scale: 0, opacity: 0, rotate: -180 },
            { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
        );

        tl.fromTo(textRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        );

        tl.fromTo(buttonRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            "-=0.3"
        );
    }, []);

    const getInitials = (name: string) => {
        return name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.avatar} ref={avatarRef}>
                {getInitials(user?.name || "User")}
            </div>

            <div ref={textRef}>
                <h1 className={styles.greeting}>
                    Hello, <span className={styles.name}>{user?.name?.split(' ')[0] || "User"}</span>
                </h1>
                <p className={styles.welcome}>Welcome to the application.</p>
            </div>

            <div ref={buttonRef}>
                <Button
                    variant="secondary"
                    className={styles.logoutBtn}
                    onClick={() => signOut({ callbackUrl: '/auth/login' })}
                >
                    LOGOUT
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </Button>
            </div>
        </div>
    );
}
