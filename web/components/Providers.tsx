"use client";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export default function Providers({
  children,
  messages,
}: {
  children: ReactNode;
  messages?: any;
}) {
  return (
    <SessionProvider>
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
    </SessionProvider>
  );
}
