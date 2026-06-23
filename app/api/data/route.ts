import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";

const KEY = "kpss_arda";

export async function GET() {
  try {
    const data = await kv.get(KEY);
    return NextResponse.json(data ?? { videos: {}, denemeler: [] });
  } catch {
    return NextResponse.json({ videos: {}, denemeler: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await kv.set(KEY, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
