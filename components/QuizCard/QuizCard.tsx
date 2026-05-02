'use client';
import { useState } from 'react';
import type { OutputQuestion } from '@/types';
import { Button, Badge, Card } from '@/design-system';
import { CodeDisplay } from '@/components/CodeDisplay/CodeDisplay';
import { ResultPanel } from '@/components/ResultPanel/ResultPanel';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  question: OutputQuestion;
  onCorrect: () => void;
  onNext: () => void;
}

const DIFFICULTY_VARIANT = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

export function QuizCard({ question, onCorrect, onNext }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const answered = selected !== null;

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    if (option === question.correctAnswer) onCorrect();
  };

  const handleNext = () => {
    setSelected(null);
    setHintVisible(false);
    onNext();
  };

  return (
    <Card variant="raised" padding="md" className={styles.card}>
      <div className={styles.meta}>
        <Badge variant={DIFFICULTY_VARIANT[question.difficulty]}>
          {question.difficulty}
        </Badge>
        <Badge variant="default">{question.category.replace(/-/g, ' ')}</Badge>
        <Badge variant="accent">
          {question.language === 'csharp' ? 'C#' : 'JavaScript'}
        </Badge>
      </div>
      <h2 className={styles.title}>{question.title}</h2>

      <div className={styles.codeWrapper}>
        <CodeDisplay code={question.code} language={question.language} />
      </div>

      <div className={styles.options}>
        {question.options.map(option => {
          let optionClass = styles.option;
          if (answered) {
            if (option === question.correctAnswer) optionClass += ` ${styles.correct}`;
            else if (option === selected) optionClass += ` ${styles.wrong}`;
          }
          return (
            <button
              key={option}
              className={optionClass}
              onClick={() => handleSelect(option)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className={styles.actions}>
        {!answered && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setHintVisible(true)}
              disabled={hintVisible}
            >
              {hintVisible ? 'Hint shown' : 'Show Hint'}
            </Button>
            {hintVisible && (
              <div className={styles.hint}>{question.hint}</div>
            )}
          </>
        )}
      </div>

      {answered && (
        <>
          <ResultPanel
            isCorrect={selected === question.correctAnswer}
            correctAnswer={question.correctAnswer}
            explanation={question.explanation}
          />
          <div className={styles.nextRow}>
            <Button variant="primary" size="md" onClick={handleNext}>
              Next Question →
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}
