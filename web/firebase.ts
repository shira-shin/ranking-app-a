import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

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

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let provider: GoogleAuthProvider | undefined;
let db: Firestore | undefined;

if (firebaseEnabled) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  db = getFirestore(app);
} else {
  // Log which variables are missing to help with local setup issues
  console.warn(
    `Firebase disabled: missing env vars (${missingVars.join(', ')})`
  );
}

export { auth, provider, db };
