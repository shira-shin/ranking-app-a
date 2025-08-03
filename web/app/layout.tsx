import '../globals.css';
import { ReactNode } from 'react';
import SessionProviderWrapper from './providers/SessionProviderWrapper';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
