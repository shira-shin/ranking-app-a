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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSubmit = async () => {
    if (candidates.some((c) => !c.trim()) || criteria.some((c) => !c.name.trim())) {
      setError('Please fill all fields');
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
      alert('Failed to fetch ranking');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold text-center">{t('generate')}</h1>
      <section>
        <h2 className="font-semibold mb-2">Candidates</h2>
        <CandidateInputs candidates={candidates} setCandidates={setCandidates} />
      </section>
      <section>
        <h2 className="font-semibold mb-2">Criteria</h2>
        <CriteriaInputs criteria={criteria} setCriteria={setCriteria} />
      </section>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        onClick={handleSubmit}
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {t('generate')}
      </button>
    </div>
  );
}
