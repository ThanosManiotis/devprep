import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  hint,
  error,
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  id,
  className,
  ...props
}, ref) => {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const wrapperCls = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : '',
  ].filter(Boolean).join(' ');

  const fieldCls = [
    styles.field,
    styles[size],
    iconLeft  ? styles.hasLeft  : '',
    iconRight ? styles.hasRight : '',
    error     ? styles.hasError : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperCls}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrap}>
        {iconLeft && (
          <span className={`${styles.icon} ${styles.iconLeft}`} aria-hidden="true">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${fieldCls} ${className ?? ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          {...props}
        />
        {iconRight && (
          <span className={`${styles.icon} ${styles.iconRight}`} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className={styles.error} role="alert">{error}</p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className={styles.hint}>{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

/* ─── Textarea variant ─── */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  hint,
  error,
  fullWidth = false,
  id,
  className,
  ...props
}, ref) => {
  const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''}`}>
      {label && <label htmlFor={textareaId} className={styles.label}>{label}</label>}
      <textarea
        ref={ref}
        id={textareaId}
        className={`${styles.textarea} ${error ? styles.hasError : ''} ${className ?? ''}`}
        aria-invalid={!!error}
        {...props}
      />
      {error && <p className={styles.error} role="alert">{error}</p>}
      {!error && hint && <p className={styles.hint}>{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';
