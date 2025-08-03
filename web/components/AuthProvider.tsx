"use client";

import { createContext, useContext, ReactNode } from 'react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  user: Session['user'] | null;
  login: () => void;
  logout: () => void;
  authEnabled: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authEnabled: true,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  // Expose the client ID to the browser so we can hide the login button
  // when OAuth isn't configured. Support the old NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
  // for backward compatibility.
  const authEnabled =
    !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
    !!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  const value: AuthContextType = {
    user: session?.user ?? null,
    login: () => signIn('google'),
    logout: () => signOut(),
    authEnabled,
    loading: status === 'loading',
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
