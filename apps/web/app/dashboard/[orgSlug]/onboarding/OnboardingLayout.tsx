import { ScrollArea } from "@workspace/ui/components/scroll-area";
import type { ReactNode } from "react";

type OnboardingLayoutProps = {
	children: ReactNode;
	title?: string;
	description?: string;
	step?: number;
	totalSteps?: number;
};

export function OnboardingLayout({
	children,
	title,
	description,
	step,
	totalSteps,
}: OnboardingLayoutProps) {
	return (
		<div className="grid min-h-screen overflow-hidden lg:grid-cols-7">
			{/* Left side - Form content (scrollable) - Takes up 3/5 */}
			<ScrollArea className="h-screen lg:col-span-4">
				<div className="flex min-h-screen items-center justify-center p-8 py-16 lg:p-16 lg:py-32">
					<div className="w-full max-w-3xl space-y-8">
						{/* Header */}
						<div className="space-y-3 text-center lg:text-left">
							{step && totalSteps && (
								<div className="font-medium text-muted-foreground text-sm">
									Step {step} of {totalSteps}
								</div>
							)}
							{title && (
								<h1 className="font-bold text-3xl tracking-tight lg:text-4xl">
									{title}
								</h1>
							)}
							{description && (
								<p className="text-lg text-muted-foreground">{description}</p>
							)}
						</div>

						{/* Form content */}
						{children}
					</div>
				</div>
			</ScrollArea>

			{/* Right side - Visual content (fixed) - Takes up 2/5 */}
			<div className="relative hidden overflow-hidden bg-muted/30 lg:col-span-3 lg:flex">
				<div className="flex w-full items-center justify-center p-12">
					<OnboardingVisual />
				</div>

				{/* Decorative gradient */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
			</div>
		</div>
	);
}

function OnboardingVisual() {
	return (
		<div className="max-w-md space-y-8">
			<div className="space-y-4">
				<div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-primary/10 lg:mx-0">
					<svg
						className="size-8 text-primary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<title>Icon</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
				</div>
				<h2 className="font-bold text-2xl">You're almost there!</h2>
				<p className="text-muted-foreground">
					Just a few quick questions to tailor your experience and get you set
					up with the perfect plan.
				</p>
			</div>

			<div className="space-y-4 rounded-lg border bg-background/50 p-6">
				<h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wide">
					What you'll get
				</h3>
				<div className="space-y-3">
					{[
						"14-day free trial",
						"No credit card required",
						"Cancel anytime",
						"Full access to all features",
						"Priority support",
					].map((feature, i) => (
						<div key={i} className="flex items-center gap-3">
							<div className="flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
								<svg
									className="size-3 text-primary"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<title>Check</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={3}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<span className="text-sm">{feature}</span>
						</div>
					))}
				</div>
			</div>

			<div className="space-y-2 text-center text-muted-foreground text-xs lg:text-left">
				<p>Trusted by 1,000+ field service businesses</p>
				<div className="flex items-center gap-2">
					<div className="-space-x-2 flex">
						{[1, 2, 3, 4].map((i) => (
							<div
								key={i}
								className="size-8 rounded-full border-2 border-background bg-muted"
							/>
						))}
					</div>
					<span className="text-xs">Join them today</span>
				</div>
			</div>
		</div>
	);
}
