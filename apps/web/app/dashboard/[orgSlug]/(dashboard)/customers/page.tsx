import { SidebarInset } from "@workspace/ui/components/sidebar";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default async function OrgCustomersPage({
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
					{ label: "Customers", url: `/dashboard/${orgSlug}/customers` },
				]}
			/>
			<div className="flex flex-1 flex-col p-6">
				<h1 className="mb-2 font-bold text-3xl">Organization Customers</h1>
				<p className="mb-6 text-muted-foreground">Organization customers</p>
			</div>
		</SidebarInset>
	);
}
