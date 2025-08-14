// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/router';

const LOCALES = ['ja', 'en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const switchTo = (target: (typeof LOCALES)[number]) => {
    const segs = router.pathname.split('/').filter(Boolean);
    if (LOCALES.includes(segs[0] as any)) segs[0] = target;
    else segs.unshift(target);

    const nextPath = '/' + segs.join('/');

    const params = new URLSearchParams();
    Object.entries(router.query).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
      else if (value !== undefined) params.append(key, value);
    });

    const qs = params.toString();
    router.push(qs ? `${nextPath}?${qs}` : nextPath);
  };

  return (
    <button
      type="button"
      onClick={() => switchTo(locale === 'ja' ? 'en' : 'ja')}
      className="px-3 py-1 rounded border"
    >
      {locale === 'ja' ? 'English' : '日本語'}
    </button>
  );
}
