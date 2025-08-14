import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

interface TimelineItem {
  id: string;
  title?: string;
  created_at?: string;
  is_public?: boolean;
}

export default function TimelinePage() {
  const t = useTranslations();
  const [items, setItems] = useState<TimelineItem[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${apiUrl}/history`);
        if (res.ok) {
          const data: TimelineItem[] = await res.json();
          setItems(data.filter((i) => i.is_public));
        }
      } catch {
        /* ignore */
      }
    };
    load();
  }, []);

  return (
    <div className="max-w-[1140px] mx-auto px-4 space-y-4">
      <h1 className="text-3xl font-bold">{t('timelineTitle')}</h1>
      {items.length === 0 ? (
        <p>{t('noResults')}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="bg-white p-2 rounded shadow">
              <Link href={`/results?id=${item.id}`}>{item.title || item.id}</Link>
              {item.created_at && (
                <span className="ml-2 text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
