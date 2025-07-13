import { useTranslations } from 'next-intl';
import { useAuth } from './AuthProvider';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ShareButton({ data }: { data: any }) {
  const t = useTranslations();
  const { user } = useAuth();

  const handleShare = async () => {
    try {
      let savedId: string | undefined;
      if (user) {
        const docRef = await addDoc(collection(db, 'users', user.uid, 'rankings'), data);
        savedId = docRef.id;
      } else {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/history`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const saved = await res.json();
        savedId = saved.id;
      }
      const url = `${window.location.origin}/results?id=${savedId}`;
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
