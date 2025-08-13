import '../globals.css';
import ClientLanguageSwitcher from '@/components/ClientLanguageSwitcher';

export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientLanguageSwitcher />
      {children}
    </>
  );
}
