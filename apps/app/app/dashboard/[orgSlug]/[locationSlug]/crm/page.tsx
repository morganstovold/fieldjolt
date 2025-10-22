import { SidebarInset } from "@workspace/ui/components/sidebar";
import CrmMainTable from "@/components/dashboard/crm/main-table";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default async function LocationDashboardPage({
	params,
}: {
	params: Promise<{ orgSlug: string; locationSlug: string }>;
}) {
	const { orgSlug, locationSlug } = await params;

	return (
		<SidebarInset>
			<SidebarPageWrapper
				breadcrumbs={[
					{ label: "Dashboard", url: `/dashboard/${orgSlug}/${locationSlug}` },
					{ label: "CRM", url: `/dashboard/${orgSlug}/${locationSlug}/crm` },
				]}
			/>
			<div className="flex h-full flex-col p-6">
				<CrmMainTable />
			</div>
		</SidebarInset>
	);
}
