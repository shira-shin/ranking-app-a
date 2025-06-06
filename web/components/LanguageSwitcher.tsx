import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

export default function LanguageSwitcher() {
  const { locale, locales, pathname, query, asPath } = useRouter();
  const t = useTranslations();
  return (
    <div>
      <span>{t('language')}: </span>
      {locales?.map((lng) => (
        <Link key={lng} href={{ pathname, query }} as={asPath} locale={lng}>
          <button disabled={locale === lng}>{lng}</button>
        </Link>
      ))}
    </div>
  );
}
