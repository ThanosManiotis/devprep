'use client';
import { useState } from 'react';
import type { Language } from '@/types';

interface ExecutionResult {
  output: string;
  error: string;
  isRunning: boolean;
  hasRun: boolean;
}

export function useCodeExecution(): ExecutionResult & {
  runCode: (code: string, language: Language) => Promise<void>;
  reset: () => void;
} {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const runCode = async (code: string, language: Language) => {
    setIsRunning(true);
    setOutput('');
    setError('');
    setHasRun(true);

    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json() as { output?: string; error?: string };
      if (data.error) setError(data.error);
      else setOutput(data.output ?? 'No output');
    } catch {
      setError('Network error — could not reach execution service');
    } finally {
      setIsRunning(false);
    }
  };

  const reset = () => {
    setOutput('');
    setError('');
    setHasRun(false);
  };

  return { output, error, isRunning, hasRun, runCode, reset };
}
