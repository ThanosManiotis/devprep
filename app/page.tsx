'use client';
import Link from 'next/link';
import { Header } from '@/components/Header/Header';
import { useProgress } from '@/hooks/useProgress';
import { outputQuestions } from '@/data/outputQuestions';
import { codingQuestions } from '@/data/codingQuestions';
import styles from './page.module.css';

export default function HomePage() {
  const { totalSolved } = useProgress();
  const totalQuestions = outputQuestions.length + codingQuestions.length;

  return (
    <div className={styles.page}>
      <Header
        totalSolved={totalSolved}
        totalQuestions={totalQuestions}
      />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.heading}>Interview Prep</h1>
          <p className={styles.subheading}>
            Sharpen your JavaScript, C#, and CSS skills with targeted practice
          </p>
        </div>
        <div className={styles.modes}>
          <Link href="/quiz" className={styles.modeCard}>
            <div className={styles.modeIcon}>🧠</div>
            <h2 className={styles.modeTitle}>Output Prediction</h2>
            <p className={styles.modeDesc}>
              Read a code snippet and predict what it outputs. Multiple-choice with explanations.
            </p>
            <span className={styles.modeCount}>{outputQuestions.length} questions</span>
          </Link>
          <Link href="/coding" className={styles.modeCard}>
            <div className={styles.modeIcon}>💻</div>
            <h2 className={styles.modeTitle}>Live Coding</h2>
            <p className={styles.modeDesc}>
              Solve coding challenges in Monaco editor. Run your code against Judge0.
            </p>
            <span className={styles.modeCount}>{codingQuestions.length} challenges</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
