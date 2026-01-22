"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AuthWrapper.module.css';

interface Props {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
}

export const AuthWrapper = ({ children, title, subtitle }: Props) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(logoRef.current,
            { scale: 0, rotation: -45, opacity: 0 },
            { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
        );

        tl.fromTo(cardRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.4"
        );
    }, []);

    return (
        <div className={styles.container}>
            <div ref={cardRef} className={styles.card}>
                <div className={styles.header}>
                    <div ref={logoRef} className={styles.logo}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className={styles.title}>{title}</h1>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                {children}
            </div>
        </div>
    );
};
