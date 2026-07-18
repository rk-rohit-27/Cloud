import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

/**
 * Edge-safe route protection.
 *
 * We deliberately do NOT use `export { auth as middleware }` here because that
 * pulls the full NextAuth config (including the MongoDB adapter) into the edge
 * runtime, which doesn't support `mongodb`'s Node built-ins (`child_process`,
 * `net`, `tls`, `dns`, `fs`).
 *
 * `getToken` only verifies the JWT session cookie — no DB access required,
 * so it runs cleanly in the edge runtime.
 */
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
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
