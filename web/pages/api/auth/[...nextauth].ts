import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import crypto from 'crypto';

// Fallback to a generated secret in development so authentication still works
// when NEXTAUTH_SECRET isn't explicitly configured.
const devSecret = crypto.randomBytes(32).toString('hex');

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
  secret: process.env.NEXTAUTH_SECRET || devSecret,
};

export default NextAuth(authOptions);
