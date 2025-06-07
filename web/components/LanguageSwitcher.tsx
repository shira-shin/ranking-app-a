import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const { locale, locales, pathname, query, asPath } = useRouter();
  const t = useTranslations();
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="font-semibold mr-2">{t('language')}:</span>
      {locales?.map((lng) => (
        <Link key={lng} href={{ pathname, query }} as={asPath} locale={lng}>
          <button
            className="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            disabled={locale === lng}
          >
            {lng}
          </button>
        </Link>
      ))}
    </div>
  );
}

