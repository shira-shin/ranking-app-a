import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const me = searchParams.get('me');
  const limit = searchParams.get('limit') ?? '6';
  if (me === 'true') {
    const s = await getServerSession();
    if (!s?.user?.id) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const rows = await prisma.ranking.findMany({
      where: { userId: s.user.id },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      select: { id: true, title: true, createdAt: true },
    });
    return NextResponse.json(rows);
  }
  return NextResponse.json({ error: 'not implemented' }, { status: 501 });
}

export async function POST(req: Request) {
  const s = await getServerSession();
  const { title, items, criteria, result, isPublic } = await req.json();
  const saved = await prisma.ranking.create({
    data: { title, items, criteria, result, isPublic: !!isPublic, userId: s?.user?.id ?? null },
    select: { id: true }
  });
  return NextResponse.json({ id: saved.id }, { status: 201 });
}
