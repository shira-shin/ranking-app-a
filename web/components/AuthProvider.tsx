import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { auth, provider, firebaseEnabled } from '../firebase';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!firebaseEnabled) return;
    const unsub = onAuthStateChanged(auth!, (u) => setUser(u));
    return () => unsub();
  }, []);

  const login = async () => {
    if (!firebaseEnabled) {
      alert('Login is disabled');
      return;
    }
    await signInWithPopup(auth!, provider!);
  };

  const logout = async () => {
    if (!firebaseEnabled) return;
    await signOut(auth!);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
