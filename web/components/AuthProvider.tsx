import { createContext, useContext, ReactNode } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

interface AuthContextType {
  user: any | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

function AuthProviderInner({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const login = async () => {
    await signIn('google');
  };
  const logout = async () => {
    await signOut();
  };
  return (
    <AuthContext.Provider value={{ user: session?.user ?? null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
}
