"use client";

import { SidebarInset } from "@workspace/ui/components/sidebar";
import { Spinner } from "@workspace/ui/components/spinner";
import { useParams } from "next/navigation";
import { SidebarPageWrapper } from "@/components/dashboard/SidebarPageWrapper";

export default function CrmLoading() {
	const { orgSlug, locationSlug } = useParams();

	return (
		<SidebarInset>
			<SidebarPageWrapper
				breadcrumbs={[
					{ label: "Dashboard", url: `/dashboard/${orgSlug}` },
					{ label: "CRM", url: `/dashboard/${orgSlug}/${locationSlug}/crm` },
				]}
			/>
			<div className="flex h-full items-center justify-center">
				<Spinner className="mx-auto" />
			</div>
		</SidebarInset>
	);
}
