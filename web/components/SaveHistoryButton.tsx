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
      alert('Saved!');
    } catch (err) {
      alert('Failed to save');
    }
  };

  return (
    <button
      className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
      onClick={handleSave}
    >
      {t('saveHistory')}
    </button>
  );
}

