import ClientLanguageSwitcher from '@/components/ClientLanguageSwitcher';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen">
        <ClientLanguageSwitcher />
        {children}
      </body>
    </html>
  );
}
