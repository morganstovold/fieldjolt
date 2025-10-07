"use client";

import { createOrganizationSchema } from "@workspace/lib/schemas/createOrganizationSchema";
import { api } from "@workspace/trpc/react";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSeparator,
	FieldSet,
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
import { useState } from "react";
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
	const router = useRouter();
	const [errors, setErrors] = useState<Record<string, string[]>>({});

	const createOrganization = api.organizations.create.useMutation({
		onSuccess: (data) => {
			router.push(`/dashboard/${data.slug}`);
		},
		onError: (error) => {
			toast.error(error.message || "Failed to create organization");
		},
	});

	return (
		<AuthLayoutWrapper
			title="Create Your Organization"
			description="Set up your field service business in minutes"
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
					<FieldSet>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="name">Organization Name</FieldLabel>
								<Input
									id="name"
									name="name"
									placeholder="e.g., Smith Plumbing & Heating"
									autoFocus
									required
									disabled={createOrganization.isPending}
								/>
								<FieldError>{errors.name}</FieldError>
							</Field>
							<Field>
								<FieldLabel htmlFor="businessType">Business Type</FieldLabel>
								<Select
									name="businessType"
									required
									disabled={createOrganization.isPending}
								>
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
									This helps us customize your experience.
								</FieldDescription>
							</Field>
							{/* phone */}
							<Field>
								<FieldLabel htmlFor="phone">Phone Number</FieldLabel>
								<Input
									id="phone"
									name="phone"
									placeholder="e.g., (555) 123-4567"
									disabled={createOrganization.isPending}
								/>
								<FieldError>{errors.phone}</FieldError>
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator />
					<FieldSet>
						<FieldGroup>
							{/* address */}
							<Field>
								<FieldLabel htmlFor="address">Address</FieldLabel>
								<Input
									id="address"
									name="address"
									placeholder="e.g., 123 Main St"
									disabled={createOrganization.isPending}
								/>
								<FieldError>{errors.address}</FieldError>
							</Field>
							<div className="flex gap-2">
								<Field>
									<FieldLabel htmlFor="city">City</FieldLabel>
									<Input
										id="city"
										name="city"
										placeholder="e.g., Anytown"
										disabled={createOrganization.isPending}
									/>
									<FieldError>{errors.city}</FieldError>
								</Field>
								<Field>
									<FieldLabel htmlFor="state">State</FieldLabel>
									<Input
										id="state"
										name="state"
										placeholder="CA"
										maxLength={2}
										disabled={createOrganization.isPending}
									/>
									<FieldError>{errors.state}</FieldError>
								</Field>
							</div>
							<Field>
								<FieldLabel htmlFor="zip">Zip Code</FieldLabel>
								<Input
									id="zip"
									name="zip"
									placeholder="e.g., 12345"
									disabled={createOrganization.isPending}
								/>
								<FieldError>{errors.zip}</FieldError>
							</Field>
						</FieldGroup>
					</FieldSet>
					<FieldSeparator />
					<FieldGroup>
						<Field>
							<FieldLabel htmlFor="referralSource">
								How did you hear about us? (Optional)
							</FieldLabel>
							<Select
								name="referralSource"
								disabled={createOrganization.isPending}
							>
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
					<Field orientation="horizontal">
						<Button type="submit" disabled={createOrganization.isPending}>
							{createOrganization.isPending ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								<span>Submit</span>
							)}
						</Button>
						<Link
							href="/dashboard"
							type="button"
							className={buttonVariants({ variant: "outline" })}
						>
							Cancel
						</Link>
					</Field>
				</FieldGroup>
			</form>
		</AuthLayoutWrapper>
	);
}
