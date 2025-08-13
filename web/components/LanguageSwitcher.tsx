"use client";

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next-intl/client';

const LOCALES = ['ja','en'] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (target: typeof LOCALES[number]) => {
    const segs = pathname.split('/').filter(Boolean);
    if (LOCALES.includes(segs[0] as any)) segs[0] = target;
    else segs.unshift(target);
    router.push('/' + segs.join('/'));
  };

  return (
    <div className="flex gap-2">
      {LOCALES.map(l => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-2 py-1 rounded ${l===locale ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

