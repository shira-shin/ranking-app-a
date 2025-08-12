import { getServerSession as originalGetServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export function getServerSession() {
  return originalGetServerSession(authOptions);
}
