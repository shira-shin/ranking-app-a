// pages/index.tsx
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

type HistoryItem = { id: string | number; title?: string };

export default function Home() {
  const { user, authEnabled } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${apiUrl}/history`);
        if (!res.ok) return;
        const data: HistoryItem[] = await res.json();
        setHistory((data || []).slice(0, 3));
      } catch {/* noop */}
    };
    if (user && authEnabled) load();
  }, [user, authEnabled, apiUrl]);

  return (
    <div className="max-w-[1140px] mx-auto px-4 text-center space-y-20">
      <section className="space-y-6 pt-20">
        <h1 className="text-5xl font-bold">ようこそ</h1>
        <p className="text-lg">このページはプレースホルダーです（UTF-8）。</p>
        <div className="flex justify-center gap-4">
          <Link href="/ja/create" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 text-xl">
            作成する
          </Link>
          <Link href="/ja/history" className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-xl">
            履歴を見る
          </Link>
        </div>
      </section>

      {user && authEnabled && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">最近の実行</h2>
          {history.length === 0 ? (
            <p>まだ履歴はありません。</p>
          ) : (
            <ul className="space-y-2 text-left max-w-xl mx-auto">
              {history.map((h) => (
                <li key={h.id} className="border p-2 rounded">
                  <Link href={`/results?id=${h.id}`}>{h.title || String(h.id)}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </div>
  );
}
