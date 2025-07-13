import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';

export default function Home() {
  const { user } = useAuth();
  const [history, setHistory] = useState<any[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    const load = async () => {
      if (user) {
        try {
          const res = await fetch(`${apiUrl}/history`);
          if (res.ok) {
            setHistory(await res.json());
          }
        } catch {
          /* ignore */
        }
      }
    };
    load();
  }, [user, apiUrl]);

  return (
    <div className="max-w-[1140px] mx-auto px-4 text-center space-y-20">
      <section className="space-y-6 pt-20">
        <h1 className="text-5xl font-bold">あらゆる『迷い』に、明確な答えを。</h1>
        <p className="text-lg">複数の選択肢を、あなただけの評価基準で簡単にランキング。直感的なビジュアル分析で、最適な選択をサポートします。</p>
        <div className="flex justify-center gap-4">
          <Link href="/create" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark text-xl">無料でランキングを作成する</Link>
          <Link href="/history" className="inline-block px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-xl">履歴を見る</Link>
        </div>
      </section>
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">たった3ステップで、意思決定をサポート</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-6xl">1️⃣</div>
            <h3 className="font-semibold">入力する</h3>
            <p>比較したい候補と、あなただけの評価基準を入力します。</p>
          </div>
          <div className="space-y-2">
            <div className="text-6xl">2️⃣</div>
            <h3 className="font-semibold">評価する</h3>
            <p>各評価基準の重要度（重み）をスライダーで直感的に設定します。</p>
          </div>
          <div className="space-y-2">
            <div className="text-6xl">3️⃣</div>
            <h3 className="font-semibold">可視化する</h3>
            <p>AIが瞬時にスコアを計算し、順位とレーダーチャートで結果をわかりやすく可視化します。</p>
          </div>
        </div>
      </section>
      <section className="space-y-8">
        <h2 className="text-3xl font-bold">あなたの意思決定を加速させる機能の数々</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">多角的なビジュアル分析</h3>
            <p>レーダーチャートで強みと弱みが一目瞭然。</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">AIによるサマリー</h3>
            <p>ランキング結果の要点を自動で文章化。</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">保存＆共有</h3>
            <p>作成したランキングを保存し、URLで共有可能。</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-semibold mb-2">柔軟なカスタマイズ</h3>
            <p>評価基準や重みを自由に追加・編集。</p>
          </div>
        </div>
      </section>
      <section className="space-y-6 pb-20">
        <h2 className="text-3xl font-bold">さあ、あなたの最初のランキングを作りましょう</h2>
        <Link href="/create" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark text-xl">無料でランキングを作成する</Link>
      </section>
      {user && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">あなたのランキング履歴</h2>
          {history.length === 0 ? (
            <p>まだ履歴はありません。</p>
          ) : (
            <ul className="space-y-2">
              {history.map((h) => (
                <li key={h.id} className="border p-2 rounded">
                  <Link href={`/results?id=${h.id}`}>{h.title || h.id}</Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
      <section className="space-y-6 pb-20">
        <h2 className="text-2xl font-bold">みんなの公開ランキング</h2>
        <p>公開ランキング一覧は準備中です。</p>
      </section>
    </div>
  );
}
