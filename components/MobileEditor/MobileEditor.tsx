'use client';
import styles from './MobileEditor.module.css';

interface MobileEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'csharp';
}

export function MobileEditor({ value, onChange, language }: MobileEditorProps) {
  return (
    <textarea
      className={styles.editor}
      value={value}
      onChange={e => onChange(e.target.value)}
      spellCheck={false}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      placeholder={`Write your ${language === 'csharp' ? 'C#' : 'JavaScript'} here...`}
      aria-label="Code editor"
    />
  );
}
