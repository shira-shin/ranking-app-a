import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { error } = req.query;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (error === 'OAuthCallback') {
    res.status(200).send(`<!DOCTYPE html>
<html><body>
<h1>OAuth Error</h1>
<p>client_id/secret 縺御ｸ閾ｴ縺励※縺・↑縺・庄閭ｽ諤ｧ縺後≠繧翫∪縺吶・/p>
<ol>
<li>DevTools 縺ｮ Network 繧ｿ繝悶〒 <code>client_id</code> 蜈磯ｭ8譁・ｭ励ｒ遒ｺ隱・/li>
<li>Secret 繧偵Ο繝ｼ繝・・繝医＠縺ｦ蜀崎ｨｭ螳・/li>
</ol>
</body></html>`);
    return;
  }
  res.status(200).send('<!DOCTYPE html><html><body><h1>OAuth Error</h1></body></html>');
}

