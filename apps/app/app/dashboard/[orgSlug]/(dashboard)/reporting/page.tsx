import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default async function OrgReportingPage({
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
					{ label: "Reporting", url: `/dashboard/${orgSlug}/reporting` },
				]}
			/>
			<div className="flex flex-1 flex-col p-6">
				<h1 className="mb-2 font-bold text-3xl">Organization Reporting</h1>
				<p className="mb-6 text-muted-foreground">Organization reporting</p>
			</div>
		</SidebarInset>
	);
}
