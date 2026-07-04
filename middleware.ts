import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl

        // Permite sempre a página de login
        if (pathname === '/admin/login') return true

        // Qualquer outra rota /admin/* exige token válido
        if (pathname.startsWith('/admin')) return !!token

        return true
      },
    },
    pages: {
      signIn: '/admin/login',
    },
  }
)

export const config = {
  // Aplica o middleware a TODAS as rotas /admin (incluindo login, para o callback acima funcionar)
  matcher: ['/admin/:path*'],
}
