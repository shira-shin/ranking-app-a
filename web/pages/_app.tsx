import type { AppProps } from 'next/app';
// NextIntlProvider is not exported in next-intl v3+
// Using NextIntlClientProvider avoids `undefined` components at runtime
import { NextIntlClientProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = require(`../messages/${locale}.json`);
  return (
    <NextIntlClientProvider locale={locale!} messages={messages}>
      <Component {...pageProps} />
    </NextIntlClientProvider>
  );
}
