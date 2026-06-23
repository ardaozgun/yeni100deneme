import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const url =
  process.env.UPSTASH_REDIS_REST_URL ||
  process.env.KV_REST_API_URL ||
  "";
const token =
  process.env.UPSTASH_REDIS_REST_TOKEN ||
  process.env.KV_REST_API_TOKEN ||
  "";

const redis = new Redis({ url, token });

const KEY = "kpss_arda";

export async function GET() {
  try {
    const data = await redis.get(KEY);
    return NextResponse.json(data ?? { videos: {}, denemeler: [] });
  } catch {
    return NextResponse.json({ videos: {}, denemeler: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    await redis.set(KEY, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
