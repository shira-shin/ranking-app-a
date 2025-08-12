import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth';

export async function POST(req: Request) {
  const s = await getServerSession();
  const { title, items, criteria, result, isPublic } = await req.json();
  const saved = await prisma.ranking.create({
    data: { title, items, criteria, result, isPublic: !!isPublic, userId: s?.user?.id ?? null },
    select: { id: true }
  });
  return NextResponse.json({ id: saved.id }, { status: 201 });
}
