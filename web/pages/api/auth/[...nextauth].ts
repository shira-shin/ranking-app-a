import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import crypto from 'crypto';

// Fallback to a generated secret in development so authentication still works
// when NEXTAUTH_SECRET isn't explicitly configured.
const devSecret = crypto.randomBytes(32).toString('hex');

// Resolve Google OAuth environment variables and provide clear feedback if
// they are missing. This helps surface misconfigured `.env` files which would
// otherwise result in a cryptic "client_id is required" error.
const googleClientId =
  process.env.GOOGLE_CLIENT_ID_NEW ??
  process.env.GOOGLE_CLIENT_ID ??
  process.env.GOOGLE_OAUTH_CLIENT_ID;
const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET_NEW ??
  process.env.GOOGLE_CLIENT_SECRET ??
  process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;

// Fail fast if the expected OAuth credentials are not configured.
if (!googleClientId || !googleClientSecret) {
  throw new Error(
    'Missing Google OAuth environment variables. Set GOOGLE_CLIENT_ID_NEW and GOOGLE_CLIENT_SECRET_NEW.',
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      ...(googleRedirectUri && {
        authorization: { params: { redirect_uri: googleRedirectUri } },
      }),
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || devSecret,
};

export default NextAuth(authOptions);
