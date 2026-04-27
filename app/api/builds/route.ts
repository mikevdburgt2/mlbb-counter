import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const builds = await prisma.build.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(builds)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { heroId, heroName, heroHead, item1, item2, item3, item4, item5, item6 } = body

  if (!heroId || !heroName) return NextResponse.json({ error: 'Missing hero' }, { status: 400 })

  const build = await prisma.build.create({
    data: {
      userId,
      heroId: Number(heroId),
      heroName,
      heroHead: heroHead ?? '',
      item1: item1 ?? '',
      item2: item2 ?? '',
      item3: item3 ?? '',
      item4: item4 ?? '',
      item5: item5 ?? '',
      item6: item6 ?? '',
    },
  })
  return NextResponse.json(build)
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as { id?: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await req.json()
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

  await prisma.build.deleteMany({ where: { id, userId } })
  return NextResponse.json({ ok: true })
}
