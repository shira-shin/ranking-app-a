import '../globals.css';
import SessionProviderWrapper from './providers/SessionProviderWrapper';
import ClientLanguageSwitcher from '../components/ClientLanguageSwitcher';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <SessionProviderWrapper>
          <ClientLanguageSwitcher />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
