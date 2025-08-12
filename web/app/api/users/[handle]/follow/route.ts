import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(_: Request, { params }: { params: { handle: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const target = await prisma.user.findUnique({ where: { handle: params.handle } });
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 });
  await prisma.follow.create({ data: { followerId: session.user.id, followingId: target.id } });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { handle: string } }) {
  const session = await getServerSession();
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const target = await prisma.user.findUnique({ where: { handle: params.handle } });
  if (!target) return NextResponse.json({ error: 'not found' }, { status: 404 });
  await prisma.follow.delete({ where: { followerId_followingId: { followerId: session.user.id, followingId: target.id } } });
  return NextResponse.json({ ok: true });
}
