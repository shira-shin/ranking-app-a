import { createContext, useContext, ReactNode } from 'react';
import {
  SessionProvider,
  useSession,
  signIn,
  signOut,
} from 'next-auth/react';
import type { User } from 'next-auth';

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

function InnerProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user ?? null;

  const login = async () => {
    await signIn('google');
  };

  const logout = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <InnerProvider>{children}</InnerProvider>
    </SessionProvider>
  );
}
