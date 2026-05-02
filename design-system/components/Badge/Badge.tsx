import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger' | 'accent';
export type BadgeSize    = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  dot = false,
  children,
  className,
}) => {
  const cls = [
    styles.badge,
    styles[variant],
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <span className={cls}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
};
