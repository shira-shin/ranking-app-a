// components/LanguageSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const LOCALES = ['ja', 'en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname() ?? '/';
  const searchParams = useSearchParams(); // 型上は null 可能と見なされる

  const switchTo = (target: (typeof LOCALES)[number]) => {
    const segs = pathname.split('/').filter(Boolean);
    if (LOCALES.includes(segs[0] as any)) segs[0] = target;
    else segs.unshift(target);

    const nextPath = '/' + segs.join('/');

    // ★ 型エラー回避：null なら空文字にフォールバック
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
