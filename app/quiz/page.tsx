'use client';
import { useState, useMemo } from 'react';
import { Header } from '@/components/Header/Header';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { QuizCard } from '@/components/QuizCard/QuizCard';
import { ProgressBadge } from '@/components/ProgressBadge/ProgressBadge';
import { useProgress } from '@/hooks/useProgress';
import { outputQuestions } from '@/data/outputQuestions';
import { weightedShuffle } from '@/utils/shuffle';
import type { Language, Difficulty, Category } from '@/types';
import styles from './page.module.css';

export default function QuizPage() {
  const { progress, markSolved, isSolved } = useProgress();
  const [langFilter, setLangFilter] = useState<Language | 'all'>('all');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [catFilter, setCatFilter] = useState<Category | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const filtered = useMemo(() => {
    const base = outputQuestions.filter(q => {
      if (langFilter !== 'all' && q.language !== langFilter) return false;
      if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
      if (catFilter !== 'all' && q.category !== catFilter) return false;
      return true;
    });
    return weightedShuffle(base, progress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langFilter, diffFilter, catFilter]);

  const availableCategories = useMemo(
    () => [...new Set(outputQuestions.map(q => q.category))].sort(),
    []
  );

  const safeIndex = Math.min(currentIndex, filtered.length - 1);
  const current = filtered[safeIndex];

  const handleCorrect = () => {
    setSessionCorrect(prev => prev + 1);
    if (current) markSolved(current.id);
  };

  const handleNext = () => {
    setSessionTotal(prev => prev + 1);
    setCurrentIndex(prev => (prev + 1) % filtered.length);
  };

  return (
    <div className={styles.page}>
      <Header
        showBack
        score={{ correct: sessionCorrect, total: sessionTotal }}
      />
      <FilterBar
        language={langFilter}
        difficulty={diffFilter}
        category={catFilter}
        availableCategories={availableCategories}
        onLanguageChange={val => { setLangFilter(val); setCurrentIndex(0); }}
        onDifficultyChange={val => { setDiffFilter(val); setCurrentIndex(0); }}
        onCategoryChange={val => { setCatFilter(val); setCurrentIndex(0); }}
      />
      <main className={styles.main}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No questions match your filters.</p>
        ) : (
          <>
            <QuizCard
              key={current.id}
              question={current}
              onCorrect={handleCorrect}
              onNext={handleNext}
            />
            <ProgressBadge
              questionIds={filtered.map(q => q.id)}
              isSolved={isSolved}
              currentIndex={safeIndex}
            />
          </>
        )}
      </main>
    </div>
  );
}
