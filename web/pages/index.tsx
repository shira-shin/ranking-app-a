import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations();
  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('title')}</h1>
      <Link href="/results">
        <button>Go to results</button>
      </Link>
    </div>
  );
}
