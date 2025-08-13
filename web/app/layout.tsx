import "./globals.css";
import Providers from "@/components/Providers";

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
    <html lang={locale}>
      <body>
        <Providers messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
