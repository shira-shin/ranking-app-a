import { ImageResponse } from '@vercel/og';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: { ranking: true }
  });
  if (!post || !post.ranking) return new Response('Not found', { status: 404 });
  const items = (post.ranking.items as any[]).slice(0, 3).map((i: any) => i.name).join(' / ');
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 48,
          justifyContent: 'center',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: 24 }}>{post.ranking.title}</div>
        <div>{items}</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
