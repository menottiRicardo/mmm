import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const requestForNextAuth = {
    headers: {
      cookie: req.headers.get("cookie"),
    },
  };
  

  const redirectUrl = req.nextUrl.clone();

  /*eslint-disable */
  // const session = await getSession({ req: requestForNextAuth as any });

  // if (session) {
  //   redirectUrl.pathname = "/";
  //   switch (session.user.role) {
  //     case "USER": {
  //       // redirectUrl.pathname = `/usuario/${session.user.id}`;
  //       redirectUrl.pathname = "/"
  //     }

  //     case "DRIVER": {
  //       // redirectUrl.pathname = `/chofer/${session.user.id}`;
  //     }
  //   }
  //   return NextResponse.rewrite(redirectUrl);
  // }
  redirectUrl.pathname = "/auth/signin";
  return NextResponse.rewrite(redirectUrl);
}

export const config = {
  matcher: ["/"],
};
