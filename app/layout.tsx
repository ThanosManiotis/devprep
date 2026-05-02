import type { Metadata } from 'next';
import '@/design-system/tokens/tokens.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevPrep — Interview Practice',
  description: 'Practice JavaScript, C#, and CSS interview questions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
