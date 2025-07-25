import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { useTranslations } from 'next-intl';

export default function Header() {
  const { user, login, logout, firebaseEnabled } = useAuth();
  const t = useTranslations();
  return (
    <header className="p-4 flex justify-between items-center border-b mb-4">
      <Link href="/">
        <span className="font-bold text-xl">Ranking App</span>
      </Link>
      <div className="flex items-center gap-2">
        {firebaseEnabled ? (
          user ? (
          <>
            <Link href="/profile">
              <span className="text-sm underline">{t('profile')}</span>
            </Link>
            <button onClick={logout} className="px-3 py-1 bg-gray-600 text-white rounded">
              {t('logout')}
            </button>
          </>
          ) : (
            <button onClick={login} className="px-3 py-1 bg-blue-600 text-white rounded">
              {t('login')}
            </button>
          )
        ) : (
          <span className="text-gray-500" title="Login unavailable">
            {t('login')}
          </span>
        )}
      </div>
    </header>
  );
}
