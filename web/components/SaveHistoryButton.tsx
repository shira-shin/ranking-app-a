import { useTranslations } from 'next-intl';
import { useAuth } from './AuthProvider';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();
  const { user, login, authEnabled } = useAuth();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSave = async () => {
    if (!authEnabled) {
      alert(t('authRequired'));
      return;
    }
    if (!user) {
      alert(t('authRequired'));
      await login();
      return;
    }
    try {
      const title = prompt(t('enterTitle')) || '';
      const isPublic = confirm(t('makePublic'));
      const payload = { data, created_at: new Date().toISOString(), title, is_public: isPublic };
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (user.email) {
        headers['Authorization'] = `Bearer ${user.email}`;
      }
      const res = await fetch(`${apiUrl}/history`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error('save failed');
      }
      alert(t('saved'));
    } catch (err) {
      alert(t('saveFailed'));
    }
  };

  return (
    <button
      className="btn btn-accent2"
      onClick={handleSave}
    >
      {t('saveHistory')}
    </button>
  );
}
