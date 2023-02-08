import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerAuthSession } from "./server/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };
  const res = NextResponse.next();

  const redirectUrl = req.nextUrl.clone();

  /*eslint-disable */
  const session = await getSession({ req: requestForNextAuth as any });

  if (session) {
    redirectUrl.pathname = "/";
    switch (session.user.role) {
      case "USER": {
        redirectUrl.pathname = `/usuario/${session.user.id}`;
      }

      case "DRIVER": {
        // redirectUrl.pathname = `/chofer/${session.user.id}`;
      }
    }
    return NextResponse.rewrite(redirectUrl);
  }
  redirectUrl.pathname = "/auth/signin";
  return NextResponse.rewrite(redirectUrl);
}

export const config = {
  matcher: ["/", "/usuario/:path*"],
};
