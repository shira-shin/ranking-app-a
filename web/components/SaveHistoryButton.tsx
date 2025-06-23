import { useTranslations } from 'next-intl';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSave = async () => {
    try {
      await fetch(`${apiUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      alert(t('saved'));
    } catch (err) {
      alert(t('saveFailed'));
    }
  };

  return (
    <button
      className="btn btn-accent"
      onClick={handleSave}
    >
      {t('saveHistory')}
    </button>
  );
}

