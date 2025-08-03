import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

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
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
