import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    isLoading?: boolean;
}

export const Button = ({ variant = 'primary', isLoading, children, className, ...props }: Props) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${isLoading || props.disabled ? styles.disabled : ''} ${className || ''}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <div className={styles.loadingSpinner} /> : children}
        </button>
    );
};
