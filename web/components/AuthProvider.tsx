"use client";

import { createContext, useContext, ReactNode } from 'react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  user: Session['user'] | null;
  login: () => Promise<void>;
  logout: () => void;
  authEnabled: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  authEnabled: true,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  const login = async () => {
    try {
      const res = await fetch('/api/auth/providers');
      if (!res.ok) {
        throw new Error('failed to load providers');
      }
      const providers = await res.json();
      if (!providers.google) {
        alert('Google auth provider not configured.');
        return;
      }
      await signIn('google');
    } catch (err) {
      console.error(err);
      alert('Authentication is currently unavailable.');
    }
  };

  const value: AuthContextType = {
    user: session?.user ?? null,
    login,
    logout: () => signOut(),
    authEnabled: true,
    loading: status === 'loading',
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
