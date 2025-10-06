import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default function DashboardPage() {
	return (
		<SidebarInset>
			<SidebarPageWrapper
				breadcrumbs={[
					{
						label: "Dashboard",
						url: "/dashboard",
					},
				]}
			/>
			<div className="flex flex-1 flex-col">
				<div className="p-6">Dashboard</div>
			</div>
		</SidebarInset>
	);
}
