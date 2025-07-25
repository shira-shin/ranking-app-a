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
      const payload = { data, created_at: new Date().toISOString() };
      if (user && firebaseEnabled) {
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

