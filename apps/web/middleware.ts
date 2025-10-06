import { getSessionCookie } from "@workspace/auth/getSessionCookie";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
