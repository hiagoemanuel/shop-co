import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

const publicPaths = ['/', '/login']

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token
    const redirect = (p: string) => NextResponse.redirect(new URL(p, req.url))

    if (pathname === '/login' && token) return redirect('/account')
    if (publicPaths.includes(pathname) || token) return NextResponse.next()
    return redirect('/login')
  },
  {
    callbacks: { authorized: () => true },
  },
)

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|new-arrivals|top-selling|dress-style|models).*)',
}
