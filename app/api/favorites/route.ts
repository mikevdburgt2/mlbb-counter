import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'Favorites are stored locally in the browser' }, { status: 503 })
}

export async function POST() {
  return NextResponse.json({ error: 'Favorites are stored locally in the browser' }, { status: 503 })
}
