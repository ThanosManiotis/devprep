import type { QuestionProgress } from '@/types';

export function weightedShuffle<T extends { id: string }>(
  questions: T[],
  progress: QuestionProgress[]
): T[] {
  const solvedIds = new Set(
    progress.filter(p => p.solved).map(p => p.questionId)
  );

  const weighted: T[] = [];
  questions.forEach(q => {
    const weight = solvedIds.has(q.id) ? 1 : 3;
    for (let i = 0; i < weight; i++) weighted.push(q);
  });

  // Fisher-Yates shuffle
  for (let i = weighted.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [weighted[i], weighted[j]] = [weighted[j], weighted[i]];
  }

  // Deduplicate preserving order
  const seen = new Set<string>();
  return weighted.filter(q => {
    if (seen.has(q.id)) return false;
    seen.add(q.id);
    return true;
  });
}
