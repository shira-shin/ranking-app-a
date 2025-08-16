import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SUPPORTED = new Set(['ja', 'en']);
const DEFAULT_LOCALE = 'ja';

// /ja/... or /en/... は素通り。ロケール無しなら /ja を付けて1回だけリダイレクト。
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const seg0 = pathname.split('/').filter(Boolean)[0];

  // 既にロケール付き → 何もしない（ここが肝）
  if (SUPPORTED.has(seg0)) return NextResponse.next();

  // _next, api, 静的ファイル は対象外（matcher でも除外するが二重に安全策）
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

// /ja/... /en/... には当てない。静的/next/api も除外。
export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
