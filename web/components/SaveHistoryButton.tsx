import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();
  const [isPublic, setIsPublic] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSave = async () => {
    try {
      await fetch(`${apiUrl}/history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data, public: isPublic })
      });
      alert(t('saved'));
    } catch (err) {
      alert(t('saveFailed'));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-1 text-sm">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        {t('publicLabel')}
      </label>
      <button className="btn btn-accent" onClick={handleSave}>
        {t('saveHistory')}
      </button>
    </div>
  );
}

