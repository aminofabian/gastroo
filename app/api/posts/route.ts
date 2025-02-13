import { client, GET_POSTS } from '@/lib/apollo-client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { data } = await client.query({
      query: GET_POSTS
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
} 