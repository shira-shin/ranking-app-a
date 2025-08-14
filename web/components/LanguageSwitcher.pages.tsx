'use client';
import { useRouter } from 'next/router';
const LOCALES = ['ja', 'en'] as const;

export default function LanguageSwitcherPages() {
  const router = useRouter();
  const pathname = router.asPath || '/';
  const switchTo = (target: (typeof LOCALES)[number]) => {
    const segs = pathname.split('/').filter(Boolean);
    if (LOCALES.includes(segs[0] as any)) segs[0] = target;
    else segs.unshift(target);
    router.push('/' + segs.join('/'));
  };
  return (
    <div className="flex gap-2">
      {LOCALES.map(l => (
        <button key={l} onClick={() => switchTo(l)} className="px-2 py-1 rounded hover:bg-gray-100">
          {l}
        </button>
      ))}
    </div>
  );
}
