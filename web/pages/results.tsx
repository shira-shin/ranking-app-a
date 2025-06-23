import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import RankCard from '../components/RankCard';
import ScoreChart from '../components/ScoreChart';
import TableView from '../components/TableView';
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
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [view, setView] = useState<'card' | 'table'>('card');

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
          const sorted = (arr as RankingItem[]).sort((a, b) =>
            (a.rank ?? 0) - (b.rank ?? 0)
          );
          setResults(sorted);
          if (sorted.length > 0) {
            setSummary(t('summary', { item: sorted[0].name }));
          }
        } catch (err) {
          console.error('parse error', err);
          setError(t('formatError'));
          setResults([]);
        }
      }
      setLoading(false);
    }
  }, [router.isReady, router.query.data]);

  useEffect(() => {
    if (!loading) {
      console.log(results);
      if (results.length > 0) {
        setSummary(t('summary', { item: results[0].name }));
      }
    }
  }, [results, loading, t]);

  const goHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4">
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
      <div className="flex justify-center gap-2">
        <button
          className={`px-3 py-1 rounded ${view === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('card')}
        >
          {t('cardView')}
        </button>
        <button
          className={`px-3 py-1 rounded ${view === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('table')}
        >
          {t('tableView')}
        </button>
      </div>
      {summary && (
        <p className="text-center font-semibold text-lg">{summary}</p>
      )}
      <div className="bg-white p-4 rounded-lg shadow min-h-[100px] max-h-[70vh] overflow-y-auto">
        {loading ? (
          <div className="flex items-center gap-2 justify-center"><Spinner />{t('generating')}</div>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : results.length === 0 ? (
          <p>{t('noResults')}</p>
        ) : (
          <>
            {view === 'card' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((item) => (
                  <RankCard key={item.rank} {...item} />
                ))}
              </div>
            ) : (
              <TableView results={results} />
            )}
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">{t('scoreChart')}</h2>
              <ScoreChart results={results} />
            </div>
          </>
        )}
      </div>
      <div className="mt-6 flex gap-2 flex-wrap">
        <ExportButtons data={results} />
        <SaveHistoryButton data={results} />
        <button
          onClick={goHome}
          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          {t('reRank')}
        </button>
      </div>
    </div>
  </div>
  );
}

