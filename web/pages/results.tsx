import LanguageSwitcher from '../components/LanguageSwitcher';
import ExportButtons from '../components/ExportButtons';
import SaveHistoryButton from '../components/SaveHistoryButton';
import ShareButton from '../components/ShareButton';
import RankCard from '../components/RankCard';
import ScoreChart from '../components/ScoreChart';
import TableView from '../components/TableView';
import CriteriaRadar from '../components/CriteriaRadar';
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
  const [view, setView] = useState<'card' | 'table' | 'analysis'>('card');

  const processArray = (data: any) => {
    let arr: any = [];
    if (Array.isArray(data)) {
      if (data.length === 1 && data[0]?.rankings) {
        arr = data[0].rankings;
      } else {
        arr = data;
      }
    } else if (Array.isArray(data.results)) {
      arr = data.results;
    } else if (Array.isArray(data.rankings)) {
      arr = data.rankings;
    } else {
      arr = [data.results ?? data.rankings ?? data];
    }
    const sorted = (arr as RankingItem[]).sort((a, b) =>
      (a.rank ?? 0) - (b.rank ?? 0)
    );
    setResults(sorted);
    if (sorted.length > 0) {
      setSummary(t('summary', { item: sorted[0].name }));
    }
  };

  useEffect(() => {
    const fetchById = async (id: string) => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/history/${id}`);
        if (res.ok) {
          const data = await res.json();
          return data.data || [];
        }
      } catch {
        /* ignore */
      }
      return [];
    };
    if (typeof window !== 'undefined') {
      const id = router.query.id as string | undefined;
      const stored = localStorage.getItem('rankingData');
      if (id) {
        fetchById(id).then((arr) => {
          processArray(arr);
        });
      } else if (stored) {
        try {
          const parsed = JSON.parse(stored);
          processArray(parsed);
        } catch (err) {
          console.error('parse error', err);
          setError(t('formatError'));
          setResults([]);
        }
      } else {
        setError(t('noResults'));
      }
      localStorage.removeItem('rankingData');
    }
    setLoading(false);
  }, [t]);

  useEffect(() => {
    if (!loading) {
      console.log(results);
      if (results.length > 0) {
        setSummary(t('summary', { item: results[0].name }));
      }
    }
  }, [results, loading, t]);

  const goHome = () => {
    router.push('/create');
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 text-base">
      <div className="space-y-4">
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
        <button
          className={`px-3 py-1 rounded ${view === 'analysis' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setView('analysis')}
        >
          {t('visualAnalysis')}
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
              <div className="space-y-4">
                {results.map((item) => (
                  <RankCard key={item.rank} {...item} />
                ))}
              </div>
            ) : view === 'table' ? (
              <TableView results={results} />
            ) : (
              <CriteriaRadar results={results} full />
            )}
            {view !== 'analysis' && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">{t('scoreChart')}</h2>
                <ScoreChart results={results} />
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-6 flex gap-2 flex-wrap">
        <ExportButtons data={results} />
        <SaveHistoryButton data={results} />
        <ShareButton data={results} />
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

