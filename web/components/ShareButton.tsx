import { useTranslations } from 'next-intl';

export default function ShareButton({ data }: { data: any }) {
  const t = useTranslations();

  const handleShare = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/history`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const saved = await res.json();
      const url = `${window.location.origin}/results?id=${saved.id}`;
      await navigator.clipboard.writeText(url);
      alert(`URL copied: ${url}`);
    } catch (e) {
      alert('Share failed');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleShare}>
      {t('share')}
    </button>
  );
}
