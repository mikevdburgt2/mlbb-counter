import { NextResponse } from 'next/server'

const UPSTREAM = 'https://openmlbb.fastapicloud.dev/api/heroes'

export async function GET() {
  try {
    // Request all heroes — upstream defaults to a low limit without this
    const url = new URL(UPSTREAM)
    url.searchParams.set('size', '200')  // API uses 'size', not 'limit' (default page is 20)
    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
      cache: 'no-store',
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
