'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { CodingQuestion } from '@/types';
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

export function CodingChallenge({ question, theme, onSolved }: CodingChallengeProps) {
  const [code, setCode] = useState(question.starterCode);
  const [showSolution, setShowSolution] = useState(false);
  const { output, error, isRunning, hasRun, runCode, reset } = useCodeExecution();
  const isMobile = useIsMobile();

  // Reset state when question changes
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

  const handleEditorChange = (value: string | undefined) => {
    setCode(value ?? '');
  };

  return (
    <div className={styles.container}>
      <div className={styles.problem}>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${styles[question.difficulty]}`}>
            {question.difficulty}
          </span>
          <span className={styles.category}>{question.category.replace(/-/g, ' ')}</span>
          <span className={styles.lang}>{question.language === 'csharp' ? 'C#' : 'JavaScript'}</span>
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
              onChange={handleEditorChange}
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
        <button
          className={styles.runBtn}
          onClick={handleRun}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : '▶ Run Code'}
        </button>

        {hasRun && (
          <button
            className={styles.solutionBtn}
            onClick={() => setShowSolution(prev => !prev)}
          >
            {showSolution ? 'Hide Solution' : 'Show Solution'}
          </button>
        )}
      </div>

      {(output || error || isRunning) && (
        <div className={`${styles.output} ${error ? styles.outputError : styles.outputSuccess}`}>
          <span className={styles.outputLabel}>Output:</span>
          {isRunning ? (
            <span className={styles.running}>Running...</span>
          ) : error ? (
            <pre className={styles.pre}>{error}</pre>
          ) : (
            <pre className={styles.pre}>{output}</pre>
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
    </div>
  );
}
