'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/hooks/useTheme';
import styles from './CodeDisplay.module.css';

interface CodeDisplayProps {
  code: string;
  language: 'javascript' | 'csharp';
}

export function CodeDisplay({ code, language }: CodeDisplayProps) {
  const { theme } = useTheme();

  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter
        language={language === 'csharp' ? 'csharp' : 'javascript'}
        style={theme === 'dark' ? vscDarkPlus : prism}
        customStyle={{
          margin: 0,
          borderRadius: 'var(--ds-radius-md)',
          fontSize: 'var(--ds-text-sm)',
          background: 'var(--ds-bg-subtle)',
          lineHeight: 'var(--ds-leading-normal)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
