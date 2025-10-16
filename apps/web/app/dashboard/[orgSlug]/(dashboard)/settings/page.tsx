import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default async function OrgSettingsPage({
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
					{ label: "Settings", url: `/dashboard/${orgSlug}/settings` },
				]}
			/>
			<div className="flex flex-1 flex-col p-6">
				<h1 className="mb-2 font-bold text-3xl">Organization Settings</h1>
				<p className="mb-6 text-muted-foreground">Organization settings</p>
			</div>
		</SidebarInset>
	);
}
