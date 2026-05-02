'use client';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

interface HeaderProps {
  showBack?: boolean;
  score?: { correct: number; total: number };
  totalSolved?: number;
  totalQuestions?: number;
}

export function Header({ showBack, score, totalSolved, totalQuestions }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack ? (
          <Link href="/" className={styles.backBtn}>
            ← Back
          </Link>
        ) : (
          <span className={styles.logo}>DevPrep</span>
        )}
      </div>
      <div className={styles.right}>
        {score !== undefined && (
          <span className={styles.score}>
            Score: {score.correct}/{score.total}
          </span>
        )}
        {totalSolved !== undefined && totalQuestions !== undefined && (
          <span className={styles.progress}>
            {totalSolved}/{totalQuestions} solved
          </span>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
