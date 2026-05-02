'use client';
import { useState } from 'react';
import { Button } from '@/design-system';
import styles from './HintPanel.module.css';

interface HintPanelProps {
  hints: string[];
}

export function HintPanel({ hints }: HintPanelProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => {
    if (revealedCount < hints.length) setRevealedCount(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      {revealedCount > 0 && (
        <div className={styles.hints}>
          {hints.slice(0, revealedCount).map((hint, i) => (
            <div key={i} className={styles.hint}>
              <span className={styles.label}>Hint {i + 1} of {hints.length}:</span>
              <span>{hint}</span>
            </div>
          ))}
        </div>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={revealNext}
        disabled={revealedCount >= hints.length}
      >
        {revealedCount === 0
          ? 'Show Hint'
          : revealedCount >= hints.length
          ? 'No more hints'
          : `Show Next Hint (${revealedCount + 1} of ${hints.length})`}
      </Button>
    </div>
  );
}
