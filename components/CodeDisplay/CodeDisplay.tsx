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
  const syntaxLang = language === 'csharp' ? 'csharp' : 'javascript';

  return (
    <div className={styles.wrapper}>
      <SyntaxHighlighter
        language={syntaxLang}
        style={theme === 'dark' ? vscDarkPlus : prism}
        customStyle={{
          margin: 0,
          borderRadius: 'var(--radius)',
          fontSize: '0.875rem',
          background: 'var(--bg-code)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
