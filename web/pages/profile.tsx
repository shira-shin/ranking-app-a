import { useAuth } from '../components/AuthProvider';
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Profile() {
  const { user } = useAuth();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      const snap = await getDocs(collection(db, 'users', user.uid, 'rankings'));
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    load();
  }, [user]);

  if (!user) {
    return <p className="p-4">Please login.</p>;
  }

  return (
    <div className="max-w-[1140px] mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>Welcome, {user.displayName}</p>
      <h2 className="font-semibold">Your Rankings</h2>
      {items.length === 0 ? (
        <p>No history</p>
      ) : (
        <ul className="space-y-2">
          {items.map((i) => (
            <li key={i.id} className="border p-2 rounded">{i.title || i.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
