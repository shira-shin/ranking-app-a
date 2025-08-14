import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const rows = await prisma.comment.findMany({
    where: { postId: params.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true,
      body: true,
      createdAt: true,
      user: { select: { id: true, name: true, image: true, handle: true } }
    }
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const { body } = (await req.json()) as { body: string };
  if (!body?.trim()) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  const created = await prisma.comment.create({
    data: { userId, postId: params.id, body }
  });
  return NextResponse.json({ id: created.id }, { status: 201 });
}
