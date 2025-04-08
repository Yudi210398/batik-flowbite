import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/fe-"))
    return NextResponse.redirect(new URL("/", req.url));

  if (token && req.nextUrl.pathname === "/")
    return NextResponse.redirect(new URL("/fe-batik", req.url));

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/",
    "/fe-batik/:path*",
    "/fe-customer/:path*",
    "/fe-order/:path*",
    "/fe-datapembelian/:path*",
  ], // Contoh: hanya halaman dashboard dan profile yang dilindungi
};
