import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ParamsType } from "./types";
// import { decodeToken } from "@/libs/firebase/admin";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*", // '/api/:path*' or '/api/(.*)'
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, { params }: ParamsType) {
  // const pathname = request.nextUrl.pathname;
  const slug = params?.id;
  const method = request.method;
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;
  // const headers = request.headers.get("Authorization");
  // const body = await request.json();

  console.warn("<<::::::  API Request LOG  ::::::>>");
  console.log({ params, slug, method, pathname, searchParams });
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  // const headers = new Headers(request.headers);
  // const token = request.headers.get("Authorization")?.split(" ")[1];
  // if (token) {
  //   decodeToken(token)
  //     .then(async (payload) => {
  //       // Token is valid.
  //       const { uid, exp, email_verified = false } = payload;
  //       const uxEpochNow = Math.floor(new Date().getTime() / 1000.0);
  //       console.log("exp :>> ", exp);
  //       console.log("uxEpoch :>> ", uxEpochNow);
  //       console.log("exp >= uxEpochNow :>> ", exp >= uxEpochNow);
  //       if (!email_verified) {
  //         return NextResponse.json(
  //           {
  //             ok: false,
  //             message: "Oops sorry, your email is not yet verified",
  //           },
  //           { status: 401, statusText: "your email is not yet verified" }
  //         );
  //       } else if (exp >= uxEpochNow) {
  //         return NextResponse.json(
  //           { ok: false, message: "Oops sorry, your session has expired" },
  //           { status: 401, statusText: "your session has expired" }
  //         );
  //       }
  //       const user = await prisma.user.findUnique({ where: { uid } });
  //       if (!user) {
  //         return NextResponse.json(
  //           { ok: false, message: "Oops sorry, your token is invalid" },
  //           { status: 401, statusText: "your token is invalid" }
  //         );
  //       }
  //       // headers.set('x-user', JSON.stringify({uid: uid, isExpired: exp>=uxEpochNow, isVerified: email_verified}))
  //       return NextResponse.next();
  //     })
  //     .catch((error) => {
  //       if (error.code == "auth/id-token-revoked") {
  //         // Token has been revoked. Inform the user to reauthenticate or signOut() the user.
  //         return NextResponse.json(
  //           {
  //             ok: false,
  //             message:
  //               "Your session had expired, please reauthenticate or signOut your self",
  //           },
  //           { status: 401, statusText: "Token has been revoked" }
  //         );
  //       } else {
  //         // Token is invalid.
  //         return NextResponse.json(
  //           { ok: false, message: "Oops sorry, your token is invalid" },
  //           { status: 401, statusText: "your token is invalid" }
  //         );
  //       }
  //     });
  // }
  // return NextResponse.json(
  //   { ok: false, message: "Your are not authorized user" },
  //   { status: 401, statusText: "your are not authorized user" }
  // );
  return NextResponse.next();
}
