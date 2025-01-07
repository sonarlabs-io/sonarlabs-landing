// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('auth_token')?.value || request.headers.get('Authorization')?.split(' ')[1];
  // const isAuthPage = request.nextUrl.pathname === '/auth';

  // // If trying to access auth page while logged in
  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }

  // // If trying to access protected routes while not logged in
  // if (!token && !isAuthPage) {
  //   return NextResponse.redirect(new URL('/auth', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - static files
     * - images
     * - favicon
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};