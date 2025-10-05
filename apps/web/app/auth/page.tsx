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
import { useState, useTransition } from "react";
import { EMAIL_REGEX } from "@/lib/utils";

export default function AuthPage() {
	const [transition, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	return (
		<main className="flex h-dvh w-full items-center justify-center">
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
						});

						if (result.error) {
							setError(result.error?.message || "Something went wrong");
						}
					});
				}}
				className="flex w-full max-w-sm flex-col gap-6"
			>
				<div className="flex flex-col gap-4 text-center">
					<h1 className="font-bold text-2xl">FieldJolt</h1>
					<p>Sign in to your account</p>
				</div>
				<div className="flex flex-col gap-4">
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
					>
						<GoogleIcon className="size-4" /> Google
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
					>
						<GithubIcon className="size-4" /> Github
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
				<Button type="submit" disabled={transition}>
					{transition ? <Spinner /> : "Continue"}
				</Button>
				<p className="text-center text-muted-foreground text-sm">
					By continuing, you agree to our{" "}
					<Link href="#" className="underline hover:text-primary">
						Terms and Conditions
					</Link>
					.
				</p>
			</form>
		</main>
	);
}
