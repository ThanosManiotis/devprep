'use client';
import type { Language, Difficulty, Category } from '@/types';
import styles from './FilterBar.module.css';

interface FilterBarProps {
  language: Language | 'all';
  difficulty: Difficulty | 'all';
  category: Category | 'all';
  availableCategories: Category[];
  onLanguageChange: (value: Language | 'all') => void;
  onDifficultyChange: (value: Difficulty | 'all') => void;
  onCategoryChange: (value: Category | 'all') => void;
}

export function FilterBar({
  language,
  difficulty,
  category,
  availableCategories,
  onLanguageChange,
  onDifficultyChange,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <select
        value={language}
        onChange={e => onLanguageChange(e.target.value as Language | 'all')}
        className={styles.select}
        aria-label="Filter by language"
      >
        <option value="all">All Languages</option>
        <option value="javascript">JavaScript</option>
        <option value="csharp">C#</option>
      </select>

      <select
        value={difficulty}
        onChange={e => onDifficultyChange(e.target.value as Difficulty | 'all')}
        className={styles.select}
        aria-label="Filter by difficulty"
      >
        <option value="all">All Difficulties</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <select
        value={category}
        onChange={e => onCategoryChange(e.target.value as Category | 'all')}
        className={styles.select}
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {availableCategories.map(cat => (
          <option key={cat} value={cat}>
            {cat.replace(/-/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
