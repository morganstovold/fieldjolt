import { Spinner } from "@workspace/ui/components/spinner";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";

export default function OrganizationOnboardingLoading() {
	return (
		<AuthLayoutWrapper showDashboardPreview>
			<Spinner className="mx-auto" />
		</AuthLayoutWrapper>
	);
}
