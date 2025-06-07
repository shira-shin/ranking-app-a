import LanguageSwitcher from '../components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations();
  return (
    <div className="max-w-xl mx-auto text-center mt-20">
      <LanguageSwitcher />
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <Link href="/results">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Go to results
        </button>
      </Link>
    </div>
  );
}

