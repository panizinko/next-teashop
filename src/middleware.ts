import { updateSession } from "@/utils/supabase/middleware";
import { type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	return await updateSession(request);
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - / (the root path)
		 * - /search (the search path)
		 * - /offers or any path starting with /offers
		 * - paths ending with common image extensions
		 *
		 * This matcher explicitly lists paths to be *excluded* from middleware,
		 * effectively protecting all others.
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
