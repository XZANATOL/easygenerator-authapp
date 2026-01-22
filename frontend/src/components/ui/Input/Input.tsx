import React, { InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ label, className, icon, error, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className={`${styles.inputWrapper} ${className || ""}`}>
                {label && <label className={styles.label}>{label}</label>}

                <div className={styles.inputContainer}>
                    {icon && <span className={styles.icon}>{icon}</span>}

                    <input
                        ref={ref}
                        type={inputType}
                        className={`${styles.input} 
              ${icon ? styles.inputWithIcon : ""} 
              ${isPassword ? styles.inputWithToggle : ""}
              ${error ? styles.errorBorder : ""}
            `}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            className={styles.toggleButton}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                // Eye Off Icon
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                    <line x1="1" y1="1" x2="23" y2="23"></line>
                                </svg>
                            ) : (
                                // Eye Icon
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            )}
                        </button>
                    )}
                </div>

                {error && <div className={styles.errorMessage}>{error}</div>}
            </div>
        );
    }
);

Input.displayName = "Input";
