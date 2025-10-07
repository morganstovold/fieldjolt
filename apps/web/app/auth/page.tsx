"use client";

import { authClient } from "@workspace/auth/client";
import { GithubIcon, GoogleIcon } from "@workspace/ui/components/brand-icons";
import { Button } from "@workspace/ui/components/button";
import {
	Field,
	FieldError,
	FieldSeparator,
} from "@workspace/ui/components/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@workspace/ui/components/input-group";
import { Spinner } from "@workspace/ui/components/spinner";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { AuthLayoutWrapper } from "@/components/auth/AuthLayoutWrapper";
import { EMAIL_REGEX } from "@/lib/utils";

export default function AuthPage() {
	const [transition, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	return (
		<AuthLayoutWrapper
			title="Welcome back"
			description="Sign in to your FieldJolt account"
			testimonial={{
				quote:
					"FieldJolt transformed how we manage our HVAC business. Scheduling is effortless, and our techs love the mobile app.",
				author: "Mike Johnson",
				role: "Owner",
				company: "Johnson HVAC Services",
			}}
		>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					startTransition(async () => {
						setError(null);

						if (!EMAIL_REGEX.test(e.currentTarget.email.value)) {
							setError("Invalid email");
							return;
						}

						const result = await authClient.signIn.magicLink({
							email: e.currentTarget.email.value,
							callbackURL: "/dashboard",
							newUserCallbackURL: "/welcome",
							errorCallbackURL: "/auth/error",
						});

						if (result.error) {
							setError(result.error?.message || "Something went wrong");
						}

						router.push("/auth/magic");
					});
				}}
				className="flex w-full flex-col gap-6"
			>
				<div className="space-y-3">
					<Button
						disabled={transition}
						onClick={() =>
							startTransition(async () => {
								await authClient.signIn.social({
									provider: "google",
								});
							})
						}
						variant="outline"
						className="w-full"
					>
						<GoogleIcon className="size-4" /> Continue with Google
					</Button>
					<Button
						disabled={transition}
						onClick={() =>
							startTransition(async () => {
								await authClient.signIn.social({
									provider: "github",
								});
							})
						}
						variant="outline"
						className="w-full"
					>
						<GithubIcon className="size-4" /> Continue with Github
					</Button>
				</div>

				<FieldSeparator>or</FieldSeparator>

				<Field>
					<InputGroup>
						<InputGroupAddon>
							<MailIcon />
						</InputGroupAddon>
						<InputGroupInput
							id="email"
							type="email"
							placeholder="name@company.com"
							required
						/>
					</InputGroup>
					<FieldError>{error}</FieldError>
				</Field>

				<Button type="submit" disabled={transition} className="w-full">
					{transition ? <Spinner /> : "Continue with Email"}
				</Button>

				<p className="text-center text-muted-foreground text-xs">
					By continuing, you agree to our{" "}
					<Link href="/terms" className="underline hover:text-primary">
						Terms
					</Link>{" "}
					and{" "}
					<Link href="/privacy" className="underline hover:text-primary">
						Privacy Policy
					</Link>
					.
				</p>
			</form>
		</AuthLayoutWrapper>
	);
}
