import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function DELETE(
  _req: Request,
  { params }: { params: { heroId: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as { id: string }).id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const heroId = parseInt(params.heroId, 10)
  if (isNaN(heroId)) return NextResponse.json({ error: 'Invalid heroId' }, { status: 400 })

  await prisma.favorite.deleteMany({ where: { userId, heroId } })
  return new NextResponse(null, { status: 204 })
}
