'use client';

import {useLocale, useTranslations} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const locales = ['ja', 'en'] as const;

  const switchTo = (target: (typeof locales)[number]) => {
    const segments = pathname.split('/').filter(Boolean);
    if (locales.includes(segments[0] as any)) {
      segments[0] = target;
    } else {
      segments.unshift(target);
    }
    router.push('/' + segments.join('/'));
  };

  return (
    <div className="flex items-center gap-2">
      <span className="font-semibold mr-2">{t('language')}</span>
      {locales.map(l => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-2 py-1 rounded ${l === locale ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
          disabled={l === locale}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
