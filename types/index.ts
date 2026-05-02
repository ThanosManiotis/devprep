export type Language = 'javascript' | 'csharp';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type Category =
  | 'closures'
  | 'hoisting'
  | 'async'
  | 'event-loop'
  | 'this'
  | 'types'
  | 'equality'
  | 'arrays'
  | 'promises'
  | 'strings'
  | 'value-types'
  | 'reference-types'
  | 'exceptions'
  | 'linq'
  | 'deadlocks'
  | 'threading'
  | 'tasks'
  | 'generics'
  | 'solid'
  | 'patterns'
  | 'css-flexbox'
  | 'css-grid'
  | 'css-display'
  | 'css-positioning'
  | 'events';

export interface OutputQuestion {
  id: string;
  language: Language;
  difficulty: Difficulty;
  category: Category;
  title: string;
  code: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface CodingQuestion {
  id: string;
  language: Language;
  difficulty: Difficulty;
  category: Category;
  title: string;
  description: string;
  examples: Array<{ input: string; output: string }>;
  starterCode: string;
  hints: string[];
  solution: string;
  explanation: string;
}

export interface QuestionProgress {
  questionId: string;
  solved: boolean;
  lastAttempted: string;
}
