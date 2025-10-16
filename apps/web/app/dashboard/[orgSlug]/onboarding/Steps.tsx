"use client";

import { completeOnboardingSchema } from "@workspace/lib/schemas/completeOnboardingSchema";
import { useMutation, useTRPC } from "@workspace/trpc/react";
import { Button } from "@workspace/ui/components/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { toast } from "@workspace/ui/components/sonner";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function OrganizationOnboardingSteps() {
	const trpc = useTRPC();
	const router = useRouter();
	const { orgSlug } = useParams<{ orgSlug: string }>();
	const completeOnboarding = useMutation(
		trpc.organization.completeOnboarding.mutationOptions({
			onSuccess: (data) => {
				router.push(`/dashboard/${orgSlug}/${data.locationSlug}`);
			},
			onError: (error) => {
				toast.error(error.message || "Failed to complete onboarding");
			},
		}),
	);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				const formData = Object.fromEntries(new FormData(e.currentTarget));
				const result = completeOnboardingSchema.safeParse({
					slug: orgSlug,
					...formData,
					locationType: "office",
				});

				if (!result.success) {
					console.log(result.error);
					return;
				}

				completeOnboarding.mutate(result.data);
			}}
			className="space-y-6"
		>
			<div className="fade-in-50 animate-in duration-300">
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="locationName">Location name</FieldLabel>
						<Input
							id="locationName"
							name="locationName"
							placeholder="e.g., Main Office, Downtown Shop"
							autoFocus
							required
							disabled={completeOnboarding.isPending}
						/>
						<FieldDescription>What do you call this location?</FieldDescription>
					</Field>
				</FieldGroup>
			</div>

			<div className="flex gap-3">
				<Button
					type="submit"
					className="flex-1"
					disabled={completeOnboarding.isPending}
				>
					{completeOnboarding.isPending ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating...
						</>
					) : (
						"Continue"
					)}
				</Button>
			</div>
		</form>
	);
}
