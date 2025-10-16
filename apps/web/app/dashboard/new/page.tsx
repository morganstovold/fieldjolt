"use client";

import { createOrganizationSchema } from "@workspace/lib/schemas/createOrganizationSchema";
import { useMutation, useTRPC } from "@workspace/trpc/react";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@workspace/ui/components/select";
import { toast } from "@workspace/ui/components/sonner";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";

const BUSINESS_TYPES = [
	{ value: "plumbing", label: "Plumbing" },
	{ value: "hvac", label: "HVAC" },
	{ value: "electrical", label: "Electrical" },
	{ value: "landscaping", label: "Landscaping" },
	{ value: "cleaning", label: "Cleaning Services" },
	{ value: "roofing", label: "Roofing" },
	{ value: "painting", label: "Painting" },
	{ value: "pest_control", label: "Pest Control" },
	{ value: "appliance_repair", label: "Appliance Repair" },
	{ value: "general_contractor", label: "General Contractor" },
	{ value: "handyman", label: "Handyman" },
	{ value: "other", label: "Other" },
];

const REFERRAL_SOURCES = [
	{ value: "google", label: "Google Search" },
	{ value: "social_media", label: "Social Media" },
	{ value: "referral", label: "Friend/Colleague Referral" },
	{ value: "youtube", label: "YouTube" },
	{ value: "podcast", label: "Podcast" },
	{ value: "advertisement", label: "Online Ad" },
	{ value: "other", label: "Other" },
];

export default function NewOrganizationPage() {
	const trpc = useTRPC();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	const createOrganization = useMutation(
		trpc.organization.create.mutationOptions({
			onSuccess: (data) => {
				startTransition(() => {
					router.push(`/dashboard/${data.slug}/onboarding`);
				});
			},
			onError: (error) => {
				toast.error(error.message || "Failed to create organization");
			},
		}),
	);

	const isLoading = createOrganization.isPending || isPending;

	return (
		<AuthLayoutWrapper
			title="Create Your Organization"
			description="Set up your field service business"
			showDashboardPreview
		>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setErrors({});

					const formData = Object.fromEntries(new FormData(e.currentTarget));
					const result = createOrganizationSchema.safeParse(formData);

					if (!result.success) {
						setErrors(result.error.flatten().fieldErrors);
						return;
					}

					createOrganization.mutate(result.data);
				}}
				className="space-y-6"
			>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="name">Business Name</FieldLabel>
						<Input
							id="name"
							name="name"
							placeholder="e.g., Smith Plumbing & Heating"
							autoFocus
							required
							disabled={isLoading}
						/>
						<FieldError>{errors.name}</FieldError>
					</Field>

					<Field>
						<FieldLabel htmlFor="businessType">Business Type</FieldLabel>
						<Select name="businessType" required disabled={isLoading}>
							<SelectTrigger>
								<SelectValue placeholder="Select business type" />
							</SelectTrigger>
							<SelectContent>
								{BUSINESS_TYPES.map((type) => (
									<SelectItem key={type.value} value={type.value}>
										{type.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldError>{errors.businessType}</FieldError>
						<FieldDescription>
							This helps us customize your experience
						</FieldDescription>
					</Field>

					<Field>
						<FieldLabel htmlFor="referralSource">
							How did you hear about us? (Optional)
						</FieldLabel>
						<Select name="referralSource" disabled={isLoading}>
							<SelectTrigger>
								<SelectValue placeholder="Select referral source" />
							</SelectTrigger>
							<SelectContent>
								{REFERRAL_SOURCES.map((source) => (
									<SelectItem key={source.value} value={source.value}>
										{source.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<FieldError>{errors.referralSource}</FieldError>
					</Field>
				</FieldGroup>

				<div className="flex gap-3">
					<Link
						href="/dashboard"
						className={buttonVariants({ variant: "outline" })}
					>
						Cancel
					</Link>
					<Button type="submit" disabled={isLoading} className="flex-1">
						{isLoading ? (
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
		</AuthLayoutWrapper>
	);
}
