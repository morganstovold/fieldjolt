import "server-only";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCContext } from "@workspace/trpc";
import type { AppRouter } from "@workspace/trpc/root";
import { appRouter } from "@workspace/trpc/root";
import { headers } from "next/headers";
import { cache } from "react";
import { makeQueryClient } from "./query-client";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
	const heads = new Headers(await headers());
	heads.set("x-trpc-source", "rsc");

	return createTRPCContext({
		headers: heads,
	});
});

export const getQueryClient = cache(makeQueryClient);

/**
 * Create a tRPC proxy for server components
 * This allows you to prefetch queries and use them in server components
 */
export const trpc = createTRPCOptionsProxy<AppRouter>({
	ctx: createContext,
	router: appRouter,
	queryClient: getQueryClient,
});

/**
 * Create a caller for direct server-side calls (not prefetching)
 * Use this when you need the data in a server component but don't need to hydrate it to the client
 */
export const caller = appRouter.createCaller(createContext);

/**
 * Helper component to wrap your app and hydrate the query client
 */
export function HydrateClient(props: { children: React.ReactNode }) {
	const queryClient = getQueryClient();
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{props.children}
		</HydrationBoundary>
	);
}

/**
 * Helper function to prefetch queries in server components
 * Use this for "render as you fetch" pattern - starts fetching immediately
 */

// biome-ignore lint/suspicious/noExplicitAny: false positive
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
	queryOptions: T,
) {
	const queryClient = getQueryClient();

	if (queryOptions.queryKey[1]?.type === "infinite") {
		// biome-ignore lint/suspicious/noExplicitAny: false positive
		void queryClient.prefetchInfiniteQuery(queryOptions as any);
	} else {
		void queryClient.prefetchQuery(queryOptions);
	}
}
