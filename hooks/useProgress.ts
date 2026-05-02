'use client';
import { useState, useEffect } from 'react';
import type { QuestionProgress } from '@/types';

const STORAGE_KEY = 'devprep_progress';

export function useProgress() {
  const [progress, setProgress] = useState<QuestionProgress[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgress(JSON.parse(stored) as QuestionProgress[]);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const markSolved = (questionId: string) => {
    setProgress(prev => {
      const existing = prev.find(p => p.questionId === questionId);
      const updated = existing
        ? prev.map(p =>
            p.questionId === questionId
              ? { ...p, solved: true, lastAttempted: new Date().toISOString() }
              : p
          )
        : [...prev, { questionId, solved: true, lastAttempted: new Date().toISOString() }];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const isSolved = (questionId: string) =>
    progress.some(p => p.questionId === questionId && p.solved);

  const resetProgress = () => {
    setProgress([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const totalSolved = progress.filter(p => p.solved).length;

  return { progress, markSolved, isSolved, resetProgress, totalSolved };
}
