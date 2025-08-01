import { useTranslations } from 'next-intl';
import { useAuth } from './AuthProvider';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();
  const { user, firebaseEnabled } = useAuth();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSave = async () => {
    try {
      const title = prompt(t('enterTitle')) || '';
      const isPublic = confirm(t('makePublic'));
      const payload = { data, created_at: new Date().toISOString(), title, is_public: isPublic };
      if (user && firebaseEnabled && db) {
        await addDoc(collection(db, 'users', user.uid, 'rankings'), payload);
      } else {
        await fetch(`${apiUrl}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
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

