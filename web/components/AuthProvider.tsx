import { createContext, useContext, ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react';

interface AuthContextType {
  user: Session['user'] | null;
  login: () => void;
  logout: () => void;
  authEnabled: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  authEnabled: true,
});

export const useAuth = () => useContext(AuthContext);

function InnerAuthProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const authEnabled = !!process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID;
  const value: AuthContextType = {
    user: session?.user ?? null,
    login: () => signIn('google'),
    logout: () => signOut(),
    authEnabled,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <InnerAuthProvider>{children}</InnerAuthProvider>
    </SessionProvider>
  );
}
