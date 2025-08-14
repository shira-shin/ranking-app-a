import './globals.css';
import Providers from '@/components/Providers';
import ReactDOMShimClient from '@/components/ReactDOMShimClient';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string };
}) {
  const locale = params?.locale ?? "ja";
  const messages = (await import(`../messages/${locale}.json`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <ReactDOMShimClient />
        <Providers messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
