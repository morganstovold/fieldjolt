import { api } from "@workspace/trpc/rsc";
import { buttonVariants } from "@workspace/ui/components/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@workspace/ui/components/item";
import { Building2Icon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";

export default async function SelectOrganizationPage() {
	const orgs = await api.organizations.list();

	if (orgs.length === 0) {
		redirect("/dashboard/new");
	}

	if (orgs.length === 1) {
		redirect(`/dashboard/${orgs[0]?.organization.slug}`);
	}

	return (
		<AuthLayoutWrapper
			title="Select Organization"
			description="Choose which business you'd like to access"
			showDashboardPreview
		>
			<div className="space-y-4">
				{orgs.map((org, index) => (
					<Item key={index} variant="outline" asChild>
						<Link href={`/dashboard/${org.organization.slug}`}>
							<ItemMedia>
								<Building2Icon className="size-5" />
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{org.organization.name}</ItemTitle>
								<ItemDescription>
									fieldjolt.com/{org.organization.slug}
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<ChevronRightIcon className="size-4" />
							</ItemActions>
						</Link>
					</Item>
				))}
				<Link
					href="/dashboard/new"
					className={buttonVariants({ className: "w-full", size: "lg" })}
				>
					Create New Organization
				</Link>
			</div>
		</AuthLayoutWrapper>
	);
}
