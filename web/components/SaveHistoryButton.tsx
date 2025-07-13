import { useTranslations } from 'next-intl';
import { useAuth } from './AuthProvider';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function SaveHistoryButton({ data }: { data: any }) {
  const t = useTranslations();
  const { user } = useAuth();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const handleSave = async () => {
    try {
      if (user) {
        await addDoc(collection(db, 'users', user.uid, 'rankings'), data);
      } else {
        await fetch(`${apiUrl}/history`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
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

