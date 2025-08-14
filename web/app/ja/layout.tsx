// app/ja/layout.tsx
import type { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const ClientLanguageSwitcher = dynamic(
  () => import('@/components/ClientLanguageSwitcher'),
  { ssr: false }
);

export default function JaLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <ClientLanguageSwitcher />
        {children}
      </body>
    </html>
  );
}
