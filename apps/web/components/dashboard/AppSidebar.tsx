import type { ValidSession } from "@workspace/auth";
import { Sidebar, SidebarContent } from "@workspace/ui/components/sidebar";
import { AppSidebarFooter } from "./SidebarFooter";
import { AppSidebarHeader } from "./SidebarHeader";
import { SidebarItems } from "./SidebarItems";

export async function AppSidebar({ session }: { session: ValidSession }) {
	return (
		<Sidebar variant="inset">
			<AppSidebarHeader session={session} />
			<SidebarContent>
				<SidebarItems />
			</SidebarContent>
			<AppSidebarFooter session={session} />
		</Sidebar>
	);
}
