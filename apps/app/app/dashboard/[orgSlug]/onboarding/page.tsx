import { OnboardingLayout } from "./OnboardingLayout";
import OrganizationOnboardingSteps from "./Steps";

export default async function OrganizationOnboarding({
	params,
}: {
	params: Promise<{
		orgSlug: string;
	}>;
}) {
	const { orgSlug } = await params;

	return (
		<OnboardingLayout
			title="Tell us about your business"
			description="This helps us customize your experience"
		>
			<OrganizationOnboardingSteps />
		</OnboardingLayout>
	);
}
