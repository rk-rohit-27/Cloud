import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const useSecureCookies =
    process.env.NEXT_PUBLIC_APP_URL?.startsWith("https://") ||
    process.env.NODE_ENV === "production";

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: useSecureCookies,
    salt: useSecureCookies ? "__Secure-authjs.session-token" : "authjs.session-token",
  });

  const isAuthed = !!token;
  const { pathname } = req.nextUrl;

  // Protect /dashboard/* — redirect to login if not authed
  if (pathname.startsWith("/dashboard") && !isAuthed) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
