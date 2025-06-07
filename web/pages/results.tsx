import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import RankCard from '../components/RankCard';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Results() {
  const t = useTranslations();
  const router = useRouter();
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (router.isReady && typeof router.query.data === 'string') {
      try {
        setResults(JSON.parse(router.query.data));
      } catch {
        setResults([]);
      }
    }
  }, [router.isReady, router.query.data]);

  return (
    <div className="max-w-2xl mx-auto">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <div className="space-y-4">
        {results.map((item) => (
          <RankCard key={item.rank} {...item} />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <ExportButtons />
        <SaveHistoryButton data={results} />
      </div>
    </div>
  );
}

