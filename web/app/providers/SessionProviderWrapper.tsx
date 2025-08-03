'use client';

import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

/**
 * Wraps the NextAuth SessionProvider so that it can be used from both
 * the App Router layout and the legacy `pages` router.  Accepts an
 * optional Session object for initial hydration when rendered in
 * `_app.tsx`.
 */
export default function SessionProviderWrapper({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
