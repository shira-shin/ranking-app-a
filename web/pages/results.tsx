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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.data === 'string') {
        try {
          const parsed = JSON.parse(router.query.data);
          console.log('results', parsed);
          setResults(Array.isArray(parsed) ? parsed : parsed.results ?? []);
        } catch {
          setResults([]);
        }
      }
      setLoading(false);
    }
  }, [router.isReady, router.query.data]);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
      <div className="space-y-4 bg-white p-4 rounded-lg shadow min-h-[100px] flex items-center justify-center">
        {loading ? (
          <p>{t('generating')}</p>
        ) : results.length === 0 ? (
          <p>{t('noResults')}</p>
        ) : (
          results.map((item) => <RankCard key={item.rank} {...item} />)
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <ExportButtons />
        <SaveHistoryButton data={results} />
      </div>
    </div>
  );
}

