import { buttonVariants } from "@workspace/ui/components/button";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";

export default function MagicPage() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background-lighter to-background">
			<div className="w-full max-w-sm">
				<div className="mb-8 flex justify-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
						<Mail className="h-6 w-6" strokeWidth={2} />
					</div>
				</div>

				<h1 className="mb-6 text-center font-semibold text-2xl">
					Check your email
				</h1>

				<p className="mb-8 text-center text-muted-foreground text-sm leading-relaxed">
					We've sent a temporary login link. Please check your inbox and click
					the link to sign in.
				</p>

				<div className="flex flex-col gap-4">
					<Link
						className={buttonVariants({ variant: "outline", size: "lg" })}
						href="/auth"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to login
					</Link>
				</div>
			</div>
		</div>
	);
}
