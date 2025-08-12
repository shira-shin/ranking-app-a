import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';

export async function GET() {
  const s = await getServerSession();
  if (!s?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: s.user.id },
    select: { name: true, handle: true, image: true, bio: true, defaultCriteria: true },
  });
  return NextResponse.json(user);
}

export async function PUT(req: Request) {
  const s = await getServerSession();
  if (!s?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const body = await req.json();
  const updated = await prisma.user.update({
    where: { id: s.user.id },
    data: {
      name: body.name ?? undefined,
      handle: body.handle ?? undefined,
      image: body.image ?? undefined,
      bio: body.bio ?? undefined,
      defaultCriteria: body.defaultCriteria ?? undefined,
    },
    select: { name: true, handle: true, image: true, bio: true, defaultCriteria: true },
  });
  return NextResponse.json(updated);
}
