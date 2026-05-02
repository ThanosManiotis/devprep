'use client';
import { Textarea } from '@/design-system';
import styles from './MobileEditor.module.css';

interface MobileEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: 'javascript' | 'csharp';
}

export function MobileEditor({ value, onChange, language }: MobileEditorProps) {
  return (
    <div className={styles.wrapper}>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.editor}
        spellCheck={false}
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
        placeholder={`Write your ${language === 'csharp' ? 'C#' : 'JavaScript'} here…`}
        aria-label="Code editor"
        rows={14}
        fullWidth
      />
    </div>
  );
}
