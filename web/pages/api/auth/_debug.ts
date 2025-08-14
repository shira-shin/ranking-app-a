import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from '../../../lib/env';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    res.status(404).end();
    return;
  }
  res.status(200).json({
    cidHead: env.GOOGLE_CLIENT_ID.slice(0, 8),
    hasSecret: !!env.GOOGLE_CLIENT_SECRET,
    nextauthUrl: env.NEXTAUTH_URL,
    redirectUri: 'http://localhost:3000/api/auth/callback/google',
  });
}

