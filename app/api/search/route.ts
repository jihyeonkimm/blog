import { searchPosts } from '@/lib/notion';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const posts = await searchPosts(query);
    return NextResponse.json({ results: posts });
  } catch (error) {
    console.error('search error:', error);
    return NextResponse.json({ error: 'search failed' }, { status: 500 });
  }
}
