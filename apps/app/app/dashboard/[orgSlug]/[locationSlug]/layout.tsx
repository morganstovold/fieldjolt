import { getSession } from "@workspace/auth";
import { HydrateClient, prefetch, trpc } from "@workspace/trpc/rsc";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import PageLoadingSkeleton from "@/components/dashboard/PageLoadingSkeleton";

export default async function LocationLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ orgSlug: string; locationSlug: string }>;
}) {
	const session = await getSession();
	if (!session) {
		redirect("/auth");
	}

	prefetch(trpc.users.me.queryOptions());

	const cookieStore = await cookies();
	const defaultOpen =
		(cookieStore.get("sidebar_state")?.value ?? "true") === "true";

	return (
		<HydrateClient>
			<SidebarProvider defaultOpen={defaultOpen}>
				<AppSidebar session={session} />
				<Suspense fallback={<PageLoadingSkeleton />}>{children}</Suspense>
			</SidebarProvider>
		</HydrateClient>
	);
}
