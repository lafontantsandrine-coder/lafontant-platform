
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth/token";

const protectedPaths = ["/dashboard", "/teacher", "/admin"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const needsAuth = protectedPaths.some((path) => pathname.startsWith(path));

  if (!needsAuth) return NextResponse.next();

  const token = request.cookies.get("lafontant_session")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const session = await verifySessionToken(token);

    if (pathname.startsWith("/teacher") &&
        !["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/admin") &&
        !["ADMIN", "SUPER_ADMIN"].includes(session.role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/teacher/:path*", "/admin/:path*"]
};
