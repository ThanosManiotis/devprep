'use client';
import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header/Header';
import { FilterBar } from '@/components/FilterBar/FilterBar';
import { CodingChallenge } from '@/components/CodingChallenge/CodingChallenge';
import { ProgressBadge } from '@/components/ProgressBadge/ProgressBadge';
import { useProgress } from '@/hooks/useProgress';
import { useTheme } from '@/hooks/useTheme';
import { codingQuestions } from '@/data/codingQuestions';
import { weightedShuffle } from '@/utils/shuffle';
import type { Language, Difficulty, Category, CodingQuestion } from '@/types';
import styles from './page.module.css';

export default function CodingPage() {
  const { progress, markSolved, isSolved } = useProgress();
  const { theme } = useTheme();
  const [langFilter, setLangFilter] = useState<Language | 'all'>('all');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [catFilter, setCatFilter] = useState<Category | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Compute the filtered base list (deterministic — safe for SSR)
  const filteredBase = useMemo(() => codingQuestions.filter(q => {
    if (langFilter !== 'all' && q.language !== langFilter) return false;
    if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
    if (catFilter !== 'all' && q.category !== catFilter) return false;
    return true;
  }), [langFilter, diffFilter, catFilter]);

  // Apply the shuffle only on the client to avoid SSR/client Math.random() mismatch
  const [filtered, setFiltered] = useState<CodingQuestion[]>(filteredBase);
  useEffect(() => {
    setFiltered(weightedShuffle(filteredBase, progress));
    setCurrentIndex(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredBase]);

  const availableCategories = useMemo(
    () => [...new Set(codingQuestions.map(q => q.category))].sort(),
    []
  );

  const safeIndex = Math.min(currentIndex, Math.max(0, filtered.length - 1));
  const current = filtered[safeIndex];

  return (
    <div className={styles.page}>
      <Header showBack />
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
          <p className={styles.empty}>No challenges match your filters.</p>
        ) : (
          <>
            <div className={styles.nav}>
              <button
                className={styles.navBtn}
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={safeIndex === 0}
              >
                ← Prev
              </button>
              <span className={styles.navCount}>
                {safeIndex + 1} / {filtered.length}
              </span>
              <button
                className={styles.navBtn}
                onClick={() => setCurrentIndex(prev => Math.min(filtered.length - 1, prev + 1))}
                disabled={safeIndex >= filtered.length - 1}
              >
                Next →
              </button>
            </div>
            <CodingChallenge
              key={current.id}
              question={current}
              theme={theme}
              onSolved={() => markSolved(current.id)}
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
