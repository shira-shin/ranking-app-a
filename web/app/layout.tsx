// app/layout.tsx
export const metadata = {
  title: 'Ranking App',
  description: 'Create and share rankings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
