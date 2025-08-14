import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '../components/AuthProvider';

interface HistoryEntry {
  id: string;
  data: any;
  created_at?: string;
}

export default function HistoryPage() {
  const t = useTranslations();
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  const { user } = useAuth();

  const loadHistory = async () => {
    try {
      const headers: Record<string, string> = {};
      if (user?.email) {
        headers['Authorization'] = `Bearer ${user.email}`;
      }
      const res = await fetch(`${apiUrl}/history`, { headers });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch {
      /* ignore */
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const headers: Record<string, string> = {};
      if (user?.email) {
        headers['Authorization'] = `Bearer ${user.email}`;
      }
      await fetch(`${apiUrl}/history/${id}`, { method: 'DELETE', headers });
      setItems(items.filter((i) => i.id !== id));
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    loadHistory();
  }, [user]);

  return (
    <div className="max-w-[1140px] mx-auto px-4 space-y-4">
      <h1 className="text-3xl font-bold">{t('historyTitle')}</h1>
      {items.length === 0 ? (
        <p>{t('noResults')}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
              <div>
                <Link href={`/results?id=${item.id}`} className="text-blue-600 hover:underline">
                  {item.data && item.data[0]?.name ? item.data[0].name : item.id}
                </Link>
                {item.created_at && (
                  <span className="ml-2 text-xs text-gray-500">{new Date(item.created_at).toLocaleString()}</span>
                )}
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">
                {t('deleteHistory')}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

