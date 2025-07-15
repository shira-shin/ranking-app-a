import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Firebase can be disabled by omitting the environment variables.  In that case
// authentication and Firestore features will be skipped.
const missingVars = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId',
].filter((key) => {
  const value = (firebaseConfig as Record<string, string | undefined>)[key];
  return (
    !value ||
    value.includes('your_') ||
    value.startsWith('dummy_')
  );
});

export const firebaseEnabled = missingVars.length === 0;

let app;
let auth;
let provider;
let db;

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  db = getFirestore(app);
} else {
  console.warn('Firebase disabled: missing env vars');
}

export { auth, provider, db };
