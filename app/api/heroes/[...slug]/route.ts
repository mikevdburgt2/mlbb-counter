import { NextRequest, NextResponse } from 'next/server'

const UPSTREAM_BASE = 'https://openmlbb.fastapicloud.dev/api/heroes'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join('/')
  const upstreamUrl = `${UPSTREAM_BASE}/${path}`

  try {
    const res = await fetch(upstreamUrl, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 300 },
    })
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      )
    }
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 502 })
  }
}
