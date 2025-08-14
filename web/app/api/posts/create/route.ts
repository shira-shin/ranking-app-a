import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { rankingId, caption, tags } = (await req.json()) as {
    rankingId: string;
    caption?: string;
    tags?: string[];
  };
  if (!rankingId) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const created = await prisma.post.create({
    data: {
      userId,
      rankingId,
      caption,
      tags: tags || [],
    },
  });
  return NextResponse.json({ id: created.id }, { status: 201 });
}
