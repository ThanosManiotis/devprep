'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { CodingQuestion } from '@/types';
import { Button, Badge, Card } from '@/design-system';
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MobileEditor } from '@/components/MobileEditor/MobileEditor';
import { HintPanel } from '@/components/HintPanel/HintPanel';
import { EditorErrorBoundary } from '@/components/EditorErrorBoundary/EditorErrorBoundary';
import styles from './CodingChallenge.module.css';

const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  { ssr: false, loading: () => <div className={styles.editorLoading}>Loading editor...</div> }
);

interface CodingChallengeProps {
  question: CodingQuestion;
  theme: 'light' | 'dark';
  onSolved: () => void;
}

const DIFFICULTY_VARIANT = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
} as const;

export function CodingChallenge({ question, theme, onSolved }: CodingChallengeProps) {
  const [code, setCode] = useState(question.starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const { output, error, isRunning, hasRun, runCode, reset } = useCodeExecution();
  const isMobile = useIsMobile();

  useEffect(() => {
    setCode(question.starterCode);
    setShowSolution(false);
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id]);

  const handleRun = async () => {
    await runCode(code, question.language);
    onSolved();
  };

  return (
    <Card variant="raised" padding="md" className={styles.container}>
      <div className={styles.problem}>
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
        <p className={styles.description}>{question.description}</p>

        {question.examples.length > 0 && (
          <div className={styles.examples}>
            <h3 className={styles.examplesTitle}>Examples</h3>
            {question.examples.map((ex, i) => (
              <div key={i} className={styles.example}>
                <div><strong>Input:</strong> <code>{ex.input}</code></div>
                <div><strong>Output:</strong> <code>{ex.output}</code></div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.editor}>
        {isMobile ? (
          <MobileEditor
            value={code}
            onChange={setCode}
            language={question.language}
          />
        ) : (
          <EditorErrorBoundary>
            <MonacoEditor
              height="320px"
              language={question.language === 'csharp' ? 'csharp' : 'javascript'}
              value={code}
              onChange={v => setCode(v ?? '')}
              theme={theme === 'dark' ? 'vs-dark' : 'light'}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                tabSize: 2,
                wordWrap: 'on',
              }}
            />
          </EditorErrorBoundary>
        )}
      </div>

      <div className={styles.controls}>
        <Button variant="primary" size="md" loading={isRunning} onClick={handleRun}>
          {isRunning ? 'Running…' : '▶ Run Code'}
        </Button>
        {hasRun && (
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowSolution(prev => !prev)}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </Button>
        )}
      </div>

      {(output || error || isRunning) && (
        <div className={`${styles.output} ${error ? styles.outputError : styles.outputSuccess}`}>
          <span className={styles.outputLabel}>Output:</span>
          {isRunning ? (
            <span className={styles.running}>Running…</span>
          ) : (
            <pre className={styles.pre}>{error || output}</pre>
          )}
        </div>
      )}

      <div className={styles.hints}>
        <HintPanel hints={question.hints} />
      </div>

      {showSolution && (
        <div className={styles.solution}>
          <h3 className={styles.solutionTitle}>Solution</h3>
          <pre className={styles.solutionCode}>{question.solution}</pre>
          <p className={styles.solutionExplanation}>{question.explanation}</p>
        </div>
      )}
    </Card>
  );
}
