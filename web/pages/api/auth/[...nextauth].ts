import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import crypto from 'crypto';

// Ensure NextAuth has the required runtime configuration even when
// environment variables are missing.  This allows `npm run dev` to run
// without manual setup while still supporting user-provided values.
if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL =
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';
}

const authSecret = process.env.NEXTAUTH_SECRET || crypto.randomBytes(32).toString('hex');

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      // Support both the standard NextAuth variable names and the
      // previous GOOGLE_OAUTH_* names for backward compatibility.
      clientId:
        process.env.GOOGLE_CLIENT_ID ?? process.env.GOOGLE_OAUTH_CLIENT_ID!,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    }),
  ],
  // Use the provided secret when available, otherwise fall back to a
  // randomly generated value for development so that login works out of the box.
  secret: authSecret,
};

export default NextAuth(authOptions);
