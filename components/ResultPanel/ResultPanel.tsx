'use client';
import styles from './ResultPanel.module.css';

interface ResultPanelProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation: string;
}

export function ResultPanel({ isCorrect, correctAnswer, explanation }: ResultPanelProps) {
  return (
    <div className={`${styles.panel} ${isCorrect ? styles.correct : styles.wrong}`}>
      <div className={styles.verdict}>
        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
      </div>
      {!isCorrect && (
        <div className={styles.answer}>
          <strong>Correct answer:</strong> {correctAnswer}
        </div>
      )}
      <div className={styles.explanation}>{explanation}</div>
    </div>
  );
}
