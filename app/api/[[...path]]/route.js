import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  return NextResponse.json({
    federation: 'United States Air Sports Federation',
    motto: 'One Federation. One Sky.',
    status: 'flying',
  });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ ok: true, echo: body });
}
