import { NextResponse } from 'next/server'

export async function DELETE() {
  return NextResponse.json({ error: 'Favorites are stored locally in the browser' }, { status: 503 })
}
