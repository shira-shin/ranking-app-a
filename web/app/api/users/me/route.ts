import { prisma } from '@/lib/prisma';
import { getServerSession } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.id) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      image: true,
      handle: true,
      bio: true,
      _count: { select: { posts: true, followers: true, following: true } }
    }
  });
  return NextResponse.json(user);
}
