import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.cookies.get('kpss_auth')?.value
  const { pathname } = req.nextUrl

  if (pathname.startsWith('/login')) {
    if (auth === 'ok') return NextResponse.redirect(new URL('/dashboard', req.url))
    return NextResponse.next()
  }

  if (auth !== 'ok') return NextResponse.redirect(new URL('/login', req.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next|favicon\\.ico|.*\\..*).*)', '/'],
}
