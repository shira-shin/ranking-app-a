import { useState } from 'react';
import { RankingItem } from '../types';
import { useTranslations } from 'next-intl';

interface Props {
  results: RankingItem[];
}

export default function TableView({ results }: Props) {
  const t = useTranslations();
  const [field, setField] = useState<'rank' | 'name' | 'score'>('rank');
  const [asc, setAsc] = useState(true);

  const toggle = (f: 'rank' | 'name' | 'score') => {
    if (field === f) setAsc(!asc);
    else {
      setField(f);
      setAsc(true);
    }
  };

  const sorted = [...results].sort((a, b) => {
    const valA = a[field];
    const valB = b[field];
    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });

  return (
    <table className="min-w-full text-sm border">
      <thead>
        <tr className="bg-gray-100">
          <th className="cursor-pointer p-2" onClick={() => toggle('rank')}>
            {t('rank')}
          </th>
          <th className="cursor-pointer p-2" onClick={() => toggle('name')}>
            {t('name') ?? 'Name'}
          </th>
          <th className="cursor-pointer p-2" onClick={() => toggle('score')}>
            {t('score')}
          </th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r) => (
          <tr key={r.rank} className="border-t">
            <td className="p-2 text-center">{r.rank}</td>
            <td className="p-2">{r.name}</td>
            <td className="p-2 text-right">{r.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
