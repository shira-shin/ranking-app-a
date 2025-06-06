import type { AppProps } from 'next/app';
import { NextIntlProvider } from 'next-intl';
import { useRouter } from 'next/router';
import '../styles.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const messages = require(`../messages/${locale}.json`);
  return (
    <NextIntlProvider locale={locale!} messages={messages}>
      <Component {...pageProps} />
    </NextIntlProvider>
  );
}
