import { useAuth } from '../components/AuthProvider';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const t = useTranslations();
  const { user, authEnabled } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!user || !authEnabled) return;
    const load = async () => {
      const res = await fetch(`${apiUrl}/history`);
      if (res.ok) {
        setItems(await res.json());
      }
    };
    load();
  }, [user, authEnabled]);

  if (!user) {
    return <p className="p-4">{t('pleaseLogin')}</p>;
  }

  return (
    <div className="max-w-[1140px] mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">{t('profile')}</h1>
      <p>{t('welcome', { name: user.name })}</p>
      <h2 className="font-semibold">{t('yourRankings')}</h2>
      {items.length === 0 ? (
        <p>{t('noHistory')}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((i) => (
            <li key={i.id} className="border p-2 rounded">{i.title || i.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
