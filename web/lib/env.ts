import { cleanEnv, str, url } from 'envalid';

export const env = cleanEnv(process.env, {
  NEXTAUTH_URL: url(),
  NEXTAUTH_SECRET: str(),
  GOOGLE_CLIENT_ID: str(),
  GOOGLE_CLIENT_SECRET: str(),
});
