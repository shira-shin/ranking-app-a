import { useTranslations } from 'next-intl';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();

  const handleSave = async () => {
    try {
      await fetch('http://localhost:8000/history', {
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
    <button onClick={handleSave}>{t('saveHistory')}</button>
  );
}
