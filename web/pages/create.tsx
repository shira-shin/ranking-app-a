import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../components/LanguageSwitcher';
import CandidateInputs from '../components/CandidateInputs';
import CriteriaInputs, { Criterion } from '../components/CriteriaInputs';
import Spinner from '../components/Spinner';

export default function Create() {
  const t = useTranslations();
  const router = useRouter();
  const [candidates, setCandidates] = useState<string[]>(['', '']);
  const [criteria, setCriteria] = useState<Criterion[]>([{ name: '', weight: 3 }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const insertSample = () => {
    setCandidates(['ラーメン屋A', 'ラーメン屋B', 'ラーメン屋C']);
    setCriteria([
      { name: '味', weight: 5 },
      { name: '値段', weight: 4 },
      { name: 'アクセス', weight: 3 },
    ]);
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async () => {
    if (candidates.some((c) => !c.trim()) || criteria.some((c) => !c.name.trim())) {
      setError(t('fillError'));
      return;
    }
    setError('');
    setLoading(true);
    const prompt = [
      `Rank the following items: ${candidates.join(', ')}.`,
      `Criteria with weights: ${criteria
        .map((c) => `${c.name} (${c.weight})`)
        .join(', ')}.`,
      "Return all candidates as JSON {\"rankings\": [{\"name\":\"\",\"score\":0,\"rank\":0,\"reasons\":{}}]}.",
      "Reasons must be in Japanese."
    ].join(' ');
    console.log('prompt', prompt);
    try {
      const res = await fetch(`${apiUrl}/rank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, count: candidates.length })
      });
      console.log('rank api status', res.status);
      if (!res.ok) {
        throw new Error('status ' + res.status);
      }
      const data = await res.json();
      console.log('ranking response', data);
      let resultArray: any = [];
      if (Array.isArray(data)) {
        if (data.length === 1 && data[0]?.rankings) {
          resultArray = data[0].rankings;
        } else {
          resultArray = data;
        }
      } else if (Array.isArray(data.results)) {
        resultArray = data.results;
      } else if (Array.isArray(data.rankings)) {
        resultArray = data.rankings;
      } else {
        resultArray = [data.results ?? data.rankings ?? data];
      }
      if (!resultArray || resultArray.length === 0) {
        setError(t('noResults'));
        return;
      }
      if (
        !Array.isArray(resultArray) ||
        resultArray.some(
          (r) =>
            !r || typeof r.name !== 'string' ||
            r.score === undefined ||
            r.rank === undefined
        )
      ) {
        setError(t('formatError'));
        return;
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('rankingData', JSON.stringify(resultArray));
      }
      router.push('/results');
    } catch (e) {
      console.error(e);
      setError(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4">
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        <LanguageSwitcher />
        <h1 className="text-3xl font-bold text-center">{t('generate')}</h1>
        <p className="text-center text-sm text-gray-600">{t('instruction')}</p>
      <div className="text-right">
        <button
          type="button"
          onClick={insertSample}
          className="text-xs text-blue-600 hover:underline"
        >
          {t('sample')}
        </button>
      </div>
      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold mb-2">{t('candidates')}</h2>
        <CandidateInputs candidates={candidates} setCandidates={setCandidates} />
      </section>
      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold mb-2">{t('criteria')}</h2>
        <CriteriaInputs criteria={criteria} setCriteria={setCriteria} />
      </section>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="btn btn-accent2 w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading && <Spinner />}
        {loading ? t('generating') : t('generate')}
      </button>
      </div>
    </div>
  );
}
