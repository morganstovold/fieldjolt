import { api } from "@workspace/trpc/rsc";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const orgs = await api.organizations.list();

	if (orgs.length === 0) {
		redirect("/dashboard/new");
	}

	if (orgs.length === 1) {
		redirect(`/dashboard/${orgs[0]?.organization.slug}`);
	}

	redirect("/dashboard/select");
}
