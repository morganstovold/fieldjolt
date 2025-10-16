import { SidebarInset } from "@workspace/ui/components/sidebar";
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
				breadcrumbs={[{ label: "Dashboard", url: `/dashboard/${orgSlug}` }]}
			/>
			<div className="flex flex-1 flex-col p-6">
				<h1 className="mb-2 font-bold text-3xl">{orgSlug}</h1>
				<p className="mb-6 text-muted-foreground">Location • {locationSlug}</p>
			</div>
		</SidebarInset>
	);
}
