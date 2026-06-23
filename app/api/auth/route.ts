import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username === "arda" && password === "1234") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("kpss_auth", "ok", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
      sameSite: "lax",
    });
    return res;
  }
  return NextResponse.json({ error: "Hatalı kullanıcı adı veya şifre" }, { status: 401 });
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("kpss_auth");
  return res;
}
