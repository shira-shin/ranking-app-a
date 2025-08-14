import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cursor = searchParams.get('cursor');
  const take = 20;
  const session = await getServerSession();
  const userId = (session?.user as any)?.id;

  const posts = await prisma.post.findMany({
    where: { ranking: { isPublic: true } },
    include: {
      user: { select: { id: true, name: true, image: true, handle: true } },
      ranking: { select: { id: true, title: true, items: true } },
      _count: { select: { likes: true, comments: true } },
      likes: userId
        ? { where: { userId }, select: { userId: true } }
        : false,
    },
    orderBy: { createdAt: 'desc' },
    take: take + 1,
    cursor: cursor ? { id: cursor } : undefined,
    skip: cursor ? 1 : 0,
  });

  let nextCursor: string | null = null;
  if (posts.length > take) {
    const next = posts.pop();
    nextCursor = next!.id;
  }

  const data = posts.map((p: any) => ({
    id: p.id,
    user: p.user,
    ranking: p.ranking,
    caption: p.caption,
    tags: p.tags,
    createdAt: p.createdAt,
    likeCount: p._count.likes,
    commentCount: p._count.comments,
    likedByMe: !!p.likes?.length,
  }));

  return NextResponse.json({ posts: data, nextCursor });
}
