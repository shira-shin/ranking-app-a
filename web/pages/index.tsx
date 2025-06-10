import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../components/LanguageSwitcher';
import CandidateInputs from '../components/CandidateInputs';
import CriteriaInputs, { Criterion } from '../components/CriteriaInputs';

export default function Home() {
  const t = useTranslations();
  const router = useRouter();
  const [candidates, setCandidates] = useState<string[]>(['', '']);
  const [criteria, setCriteria] = useState<Criterion[]>([{ name: '', weight: 3 }]);
  const [error, setError] = useState('');

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
    const prompt = `Rank the following items: ${candidates.join(', ')}. Criteria with weights: ${criteria
      .map((c) => `${c.name} (${c.weight})`)
      .join(', ')}.`;
    try {
      const res = await fetch(`${apiUrl}/rank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      router.push({ pathname: '/results', query: { data: JSON.stringify(data) } });
    } catch (e) {
      alert(t('fetchError'));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold text-center">{t('generate')}</h1>
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
        <h2 className="font-semibold mb-2">{t('candidates')}</h2>
        <CandidateInputs candidates={candidates} setCandidates={setCandidates} />
      </section>
      <section className="bg-white p-4 rounded-lg shadow space-y-2">
        <h2 className="font-semibold mb-2">{t('criteria')}</h2>
        <CriteriaInputs criteria={criteria} setCriteria={setCriteria} />
      </section>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        {t('generate')}
      </button>
    </div>
  );
}
