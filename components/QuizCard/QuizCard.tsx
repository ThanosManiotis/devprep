'use client';
import { useState } from 'react';
import type { OutputQuestion } from '@/types';
import { CodeDisplay } from '@/components/CodeDisplay/CodeDisplay';
import { ResultPanel } from '@/components/ResultPanel/ResultPanel';
import styles from './QuizCard.module.css';

interface QuizCardProps {
  question: OutputQuestion;
  onCorrect: () => void;
  onNext: () => void;
}

export function QuizCard({ question, onCorrect, onNext }: QuizCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const answered = selected !== null;

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    if (option === question.correctAnswer) {
      onCorrect();
    }
  };

  const handleNext = () => {
    setSelected(null);
    setHintVisible(false);
    onNext();
  };

  return (
    <div className={styles.card}>
      <div className={styles.meta}>
        <span className={`${styles.badge} ${styles[question.difficulty]}`}>
          {question.difficulty}
        </span>
        <span className={styles.category}>{question.category.replace(/-/g, ' ')}</span>
        <span className={styles.lang}>{question.language === 'csharp' ? 'C#' : 'JavaScript'}</span>
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
            <button
              className={styles.hintBtn}
              onClick={() => setHintVisible(true)}
              disabled={hintVisible}
            >
              {hintVisible ? 'Hint shown' : 'Show Hint'}
            </button>
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
          <button className={styles.nextBtn} onClick={handleNext}>
            Next Question →
          </button>
        </>
      )}
    </div>
  );
}
