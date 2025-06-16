import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import RankCard from '../components/RankCard';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import { RankingItem } from '../types';

export default function Results() {
  const t = useTranslations();
  const router = useRouter();
  const [results, setResults] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (typeof router.query.data === 'string') {
        try {
          const parsed = JSON.parse(router.query.data);
          console.log('router query parsed', parsed);
          let arr: any = [];
          if (Array.isArray(parsed)) {
            if (parsed.length === 1 && parsed[0]?.rankings) {
              arr = parsed[0].rankings;
            } else {
              arr = parsed;
            }
          } else if (Array.isArray(parsed.results)) {
            arr = parsed.results;
          } else if (Array.isArray(parsed.rankings)) {
            arr = parsed.rankings;
          } else {
            arr = [parsed.results ?? parsed.rankings ?? parsed];
          }
          console.log('arr', arr);
          setResults(arr as RankingItem[]);
        } catch (err) {
          console.error('parse error', err);
          setResults([]);
        }
      }
      setLoading(false);
    }
  }, [router.isReady, router.query.data]);

  useEffect(() => {
    if (!loading) {
      console.log(results);
    }
  }, [results, loading]);

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <LanguageSwitcher />
      <h1 className="text-3xl font-bold text-center">{t('title')}</h1>
      <div className="text-center">
        <button
          onClick={goHome}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('backHome')}
        </button>
      </div>
      <div className="space-y-4 bg-white p-4 rounded-lg shadow min-h-[100px] flex items-center justify-center">
        {loading ? (
          <div className="flex items-center gap-2"><Spinner />{t('generating')}</div>
        ) : !Array.isArray(results) || results.length === 0 ? (
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

