// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LOCALES = ['ja', 'en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams(); // 型では null 可能と見なされうる

  const switchTo = (target: (typeof LOCALES)[number]) => {
    const segs = pathname.split('/').filter(Boolean);
    if (LOCALES.includes(segs[0] as any)) segs[0] = target;
    else segs.unshift(target);
    const nextPath = '/' + segs.join('/');
    const qs = searchParams?.toString() ?? '';
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
