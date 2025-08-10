import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { error } = req.query;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (error === 'OAuthCallback') {
    res.status(200).send(`<!DOCTYPE html>
<html><body>
<h1>OAuth Error</h1>
<p>client_id/secret が一致していない可能性があります。</p>
<ol>
<li>DevTools の Network タブで <code>client_id</code> 先頭8文字を確認</li>
<li>Secret をローテートして再設定</li>
</ol>
</body></html>`);
    return;
  }
  res.status(200).send('<!DOCTYPE html><html><body><h1>OAuth Error</h1></body></html>');
}
