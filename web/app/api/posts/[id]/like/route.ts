import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  await prisma.like.create({ data: { userId, postId: params.id } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  const userId = (session?.user as any)?.id;
  if (!userId) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  await prisma.like.delete({ where: { userId_postId: { userId, postId: params.id } } });
  return NextResponse.json({ ok: true });
}
