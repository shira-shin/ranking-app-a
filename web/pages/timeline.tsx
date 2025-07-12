import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RankingItem } from '../types';

interface HistoryEntry {
  id: string;
  data: RankingItem[];
  public?: boolean;
}

export default function TimelinePage() {
  const t = useTranslations();
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${apiUrl}/public`);
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch {
        /* ignore */
      }
    };
    load();
  }, [apiUrl]);

  return (
    <div className="max-w-[1100px] mx-auto px-4 space-y-4">
      <h1 className="text-3xl font-bold">{t('timelineTitle')}</h1>
      {items.length === 0 ? (
        <p>{t('noResults')}</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-1">
                {item.data && item.data[0]?.name ? item.data[0].name : item.id}
              </h2>
              <p className="text-sm mb-2 truncate">
                {Array.isArray(item.data)
                  ? item.data.map((r) => r.name).join(', ')
                  : ''}
              </p>
              <Link
                href={`/results?id=${item.id}`}
                className="text-blue-600 hover:underline"
              >
                {t('view')}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
