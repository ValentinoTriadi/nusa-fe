import { NextRequest, NextResponse } from 'next/server';

// Define protected and public routes
const protectedRoutes = [
  '/home',
  '/collaboration',
  '/marketplace',
  '/profile',
  '/favorites',
  '/cart',
];

const authRoutes = ['/auth/login', '/auth/register'];

const publicRoutes = ['/'];

// Helper function to check if user is authenticated via Better Auth
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:5001';

    // Get session from Better Auth backend
    const response = await fetch(`${baseUrl}/api/auth/get-session`, {
      method: 'GET',
      headers: {
        Cookie: request.headers.get('cookie') || '',
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important for cookie handling
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data.session;
  } catch (_error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const isUserAuthenticated = await isAuthenticated(request);

  // Handle protected routes
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!isUserAuthenticated) {
      // Redirect to login with callback URL
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // Handle auth routes (login, register)
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (isUserAuthenticated) {
      // Redirect authenticated users away from auth pages
      const callbackUrl = request.nextUrl.searchParams.get('callbackUrl');
      const redirectUrl =
        callbackUrl && callbackUrl !== '/auth/login' ? callbackUrl : '/home';
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
    return NextResponse.next();
  }

  // Allow access to public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Default: allow access but you might want to redirect to 404
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
