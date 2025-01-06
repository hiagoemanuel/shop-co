import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token
    const redirect = (p: string) => NextResponse.redirect(new URL(p, req.url))

    if (pathname !== '/login' && !token) return redirect('/login')
    if (pathname === '/login' && token) return redirect('/dashboard')

    return NextResponse.next()
  },
  {
    callbacks: { authorized: () => true },
  },
)

export const config = { matcher: ['/dashboard', '/cart', '/login'] }
