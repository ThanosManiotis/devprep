import React from 'react';
import styles from './Card.module.css';

export type CardVariant = 'raised' | 'flat' | 'metric' | 'featured';

export interface CardProps {
  variant?: CardVariant;
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'raised',
  padding = 'md',
  children,
  className,
  onClick,
}) => {
  const cls = [
    styles.card,
    styles[variant],
    styles[`p-${padding}`],
    onClick ? styles.clickable : '',
    className ?? '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cls} onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
      {children}
    </div>
  );
};

/* ─── Card sub-components ─── */
export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle, action }) => (
  <div className={styles.header}>
    <div className={styles.headerText}>
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
    {action && <div className={styles.headerAction}>{action}</div>}
  </div>
);

export const CardDivider: React.FC = () => <hr className={styles.divider} />;

export interface CardMetricProps {
  label: string;
  value: string | number;
  trend?: { value: string; positive: boolean };
}

export const CardMetric: React.FC<CardMetricProps> = ({ label, value, trend }) => (
  <div className={styles.metric}>
    <p className={styles.metricLabel}>{label}</p>
    <div className={styles.metricRow}>
      <p className={styles.metricValue}>{value}</p>
      {trend && (
        <span className={`${styles.trend} ${trend.positive ? styles.trendUp : styles.trendDown}`}>
          {trend.positive ? '↑' : '↓'} {trend.value}
        </span>
      )}
    </div>
  </div>
);
