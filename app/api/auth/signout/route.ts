import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ signedOut: true });
  for (const name of ["alumnia_access_token", "alumnia_refresh_token"]) {
    response.cookies.set(name, "", { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "lax", path: "/", maxAge: 0 });
  }
  return response;
}