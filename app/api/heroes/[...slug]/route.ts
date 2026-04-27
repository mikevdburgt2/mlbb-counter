import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string[] }> }) {
  try {
    const { slug } = await context.params;
    const path = slug.join('/');

    const externalUrl = `https://openmlbb.fastapicloud.dev/api/heroes/${path}`;

    const response = await fetch(externalUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Hero not found' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
