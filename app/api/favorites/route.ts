import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as { id: string }).id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(favorites)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as { id: string }).id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { heroId, heroName, heroHead } = await req.json()
  if (!heroId || !heroName) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const favorite = await prisma.favorite.upsert({
    where: { userId_heroId: { userId, heroId: Number(heroId) } },
    update: { heroName, heroHead: heroHead ?? '' },
    create: { userId, heroId: Number(heroId), heroName, heroHead: heroHead ?? '' },
  })
  return NextResponse.json(favorite, { status: 201 })
}
