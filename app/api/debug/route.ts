import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    authSecret: !!process.env.AUTH_SECRET,
    githubId: !!process.env.GITHUB_ID,
    googleId: !!process.env.GOOGLE_ID,
    // Don't expose actual values in production
  });
} 