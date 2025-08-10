import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '../../../lib/env';
import { isPlaceholder } from '../../../utils/isPlaceholder';

// Detect and surface placeholder credentials so developers know to replace
// them with real values.
if (isPlaceholder(env.GOOGLE_CLIENT_ID) || isPlaceholder(env.GOOGLE_CLIENT_SECRET)) {
  throw new Error(
    'Google OAuth environment variables contain placeholder values. Replace them with real credentials.',
  );
}

// Emit diagnostics in development only
if (process.env.NODE_ENV !== 'production') {
  console.log('CID(head):', env.GOOGLE_CLIENT_ID.slice(0, 8));
  console.log('CSEC(set):', !!env.GOOGLE_CLIENT_SECRET);
  console.log('NEXTAUTH_URL:', env.NEXTAUTH_URL);
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
