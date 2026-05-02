'use client';
import styles from './ProgressBadge.module.css';

interface ProgressBadgeProps {
  questionIds: string[];
  isSolved: (id: string) => boolean;
  currentIndex: number;
}

export function ProgressBadge({ questionIds, isSolved, currentIndex }: ProgressBadgeProps) {
  return (
    <div className={styles.container} aria-label="Question progress">
      {questionIds.map((id, index) => (
        <span
          key={id}
          className={`${styles.dot} ${isSolved(id) ? styles.solved : ''} ${index === currentIndex ? styles.current : ''}`}
          title={`Question ${index + 1}${isSolved(id) ? ' (solved)' : ''}`}
        />
      ))}
    </div>
  );
}
