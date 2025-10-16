import { getSessionCookie } from "@workspace/auth/getSessionCookie";
import { type NextRequest, NextResponse } from "next/server";

const dashboardNonOrgRoutes = ["/dashboard/new", "/dashboard/settings"];

export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth", request.url));
	}

	if (dashboardNonOrgRoutes.includes(request.nextUrl.pathname)) {
		return NextResponse.next();
	}

	const orgSlug = request.nextUrl.pathname.split("/")[2];
	const locationSlug = request.nextUrl.pathname.split("/")[3];
	const newHeaders = new Headers(request.headers);

	if (orgSlug) {
		newHeaders.set("x-org", orgSlug);
	}

	if (locationSlug) {
		newHeaders.set("x-location", locationSlug);
	}

	return NextResponse.next({
		headers: newHeaders,
	});
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
