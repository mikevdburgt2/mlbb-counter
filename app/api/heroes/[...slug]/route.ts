import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string[] } }) {
  try {
    const slug = params.slug.join('/');
    const externalUrl = `https://openmlbb.fastapicloud.dev/api/heroes/${slug}`;

    const res = await fetch(externalUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Hero not found' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch hero data' }, { status: 500 });
  }
}
