"use client";

import type { AppProps } from 'next/app';
import type { Session } from 'next-auth';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../globals.css';
import { AuthProvider } from '../components/AuthProvider';
import SessionProviderWrapper from '../app/providers/SessionProviderWrapper';
import Header from '../components/Header';

export default function MyApp({ Component, pageProps }: AppProps<{ session?: Session | null }>) {
  const { locale } = useRouter();
  const messages = require(`../messages/${locale}.json`);
  // Set a global default time zone to avoid server/client mismatches
  // See https://next-intl.dev/docs/configuration#time-zone
  const timeZone = process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC';
  return (
    <SessionProviderWrapper session={pageProps.session}>
      <AuthProvider>
        <NextIntlClientProvider locale={locale!} messages={messages} timeZone={timeZone}>
          <Header />
          <Component {...pageProps} />
        </NextIntlClientProvider>
      </AuthProvider>
    </SessionProviderWrapper>
  );
}
