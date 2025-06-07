import type { AppProps } from 'next/app';
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = require(`../messages/${locale}.json`);
  // Set a global default time zone to avoid server/client mismatches
  // See https://next-intl.dev/docs/configuration#time-zone
  const timeZone = process.env.NEXT_PUBLIC_TIME_ZONE || 'UTC';
  return (
    <NextIntlClientProvider locale={locale!} messages={messages} timeZone={timeZone}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
