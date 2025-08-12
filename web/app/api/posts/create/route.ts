import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { rankingId, caption, tags } = (await req.json()) as {
    rankingId: string;
    caption?: string;
    tags?: string[];
  };
  if (!rankingId) return NextResponse.json({ error: 'invalid' }, { status: 400 });
  const created = await prisma.post.create({
    data: {
      userId: session.user.id,
      rankingId,
      caption,
      tags: tags || [],
    },
  });
  return NextResponse.json({ id: created.id }, { status: 201 });
}
