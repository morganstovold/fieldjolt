import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default async function OrgLocationsPage({
	params,
}: {
	params: Promise<{ orgSlug: string }>;
}) {
	const { orgSlug } = await params;

	return (
		<SidebarInset>
			<SidebarPageWrapper
				breadcrumbs={[
					{ label: "Dashboard", url: `/dashboard/${orgSlug}` },
					{ label: "Locations", url: `/dashboard/${orgSlug}/locations` },
				]}
			/>
			<div className="flex flex-1 flex-col p-6">
				<h1 className="mb-2 font-bold text-3xl">Organization Locations</h1>
				<p className="mb-6 text-muted-foreground">Organization locations</p>
			</div>
		</SidebarInset>
	);
}
