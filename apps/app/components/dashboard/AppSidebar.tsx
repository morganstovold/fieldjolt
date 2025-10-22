import type { ValidSession } from "@workspace/auth";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from "@workspace/ui/components/sidebar";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Suspense } from "react";
import { AppSidebarFooter } from "./SidebarFooter";
import { AppSidebarHeader } from "./SidebarHeader";
import { SidebarItems } from "./SidebarItems";

export function AppSidebar({ session }: { session: ValidSession }) {
	return (
		<Sidebar variant="inset">
			<Suspense fallback={<AppSidebarHeaderSkeleton />}>
				<AppSidebarHeader />
			</Suspense>
			<SidebarContent>
				<SidebarItems />
			</SidebarContent>
			<AppSidebarFooter session={session} />
		</Sidebar>
	);
}

function AppSidebarHeaderSkeleton() {
	return (
		<SidebarHeader>
			<Skeleton className="size-12 w-full" />
		</SidebarHeader>
	);
}
