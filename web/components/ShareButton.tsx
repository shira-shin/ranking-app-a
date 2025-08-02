import { useTranslations } from 'next-intl';

export default function ShareButton({ data }: { data: any }) {
  const t = useTranslations();

  const saveData = async (): Promise<string> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiUrl}/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const saved = await res.json();
    return `${window.location.origin}/results?id=${saved.id}`;
  };

  const handleCopy = async () => {
    try {
      const url = await saveData();
      await navigator.clipboard.writeText(url);
      alert(`URL copied: ${url}`);
    } catch (e) {
      alert('Share failed');
    }
  };

  const handleTweet = async () => {
    try {
      const url = await saveData();
      const intent = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
      window.open(intent, '_blank');
    } catch (e) {
      alert('Share failed');
    }
  };

  return (
    <div className="flex gap-2">
      <button className="btn btn-primary" onClick={handleCopy}>
        {t('copyLink')}
      </button>
      <button className="btn btn-primary" onClick={handleTweet}>
        {t('shareOnX')}
      </button>
    </div>
  );
}
