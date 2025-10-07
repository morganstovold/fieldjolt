import { ScrollArea } from "@workspace/ui/components/scroll-area";
import type { ReactNode } from "react";

type AuthLayoutWrapperProps = {
	children: ReactNode;
	title?: string;
	description?: string;
	testimonial?: {
		quote: string;
		author: string;
		role: string;
		company: string;
	};
	showDashboardPreview?: boolean;
};

export function AuthLayoutWrapper({
	children,
	title,
	description,
	testimonial,
	showDashboardPreview = false,
}: AuthLayoutWrapperProps) {
	return (
		<div className="grid min-h-screen overflow-hidden lg:grid-cols-2">
			{/* Left side - Form content (scrollable) */}
			<ScrollArea className="h-screen">
				<div className="flex min-h-screen items-center justify-center p-8 py-16 lg:p-12 lg:py-32">
					<div className="w-full max-w-md space-y-6">
						{/* Logo/Header */}
						<div className="space-y-2 text-center lg:text-left">
							<h1 className="font-bold text-3xl tracking-tight">
								{title || "FieldJolt"}
							</h1>
							{description && (
								<p className="text-muted-foreground">{description}</p>
							)}
						</div>

						{/* Form content */}
						{children}
					</div>
				</div>
			</ScrollArea>

			{/* Right side - Visual content (fixed) */}
			<div className="relative hidden overflow-hidden bg-muted/30 lg:flex">
				<div className="flex w-full items-center justify-center p-12">
					{showDashboardPreview ? (
						<DashboardPreview />
					) : testimonial ? (
						<TestimonialCard {...testimonial} />
					) : (
						<DefaultVisual />
					)}
				</div>

				{/* Decorative gradient */}
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
			</div>
		</div>
	);
}

function TestimonialCard({
	quote,
	author,
	role,
	company,
}: {
	quote: string;
	author: string;
	role: string;
	company: string;
}) {
	return (
		<div className="max-w-lg space-y-6">
			<div className="space-y-4">
				<svg
					className="size-10 text-primary/20"
					fill="currentColor"
					viewBox="0 0 32 32"
				>
					<title>Quote</title>
					<path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
				</svg>
				<blockquote className="font-medium text-xl leading-relaxed">
					{quote}
				</blockquote>
			</div>
			<div className="space-y-1">
				<p className="font-semibold">{author}</p>
				<p className="text-muted-foreground text-sm">
					{role} at {company}
				</p>
			</div>
		</div>
	);
}

function DashboardPreview() {
	return (
		<div className="relative w-full max-w-2xl">
			<div className="overflow-hidden rounded-lg border bg-background shadow-2xl">
				{/* Mock dashboard */}
				<div className="aspect-video bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
					<div className="space-y-4">
						<div className="flex items-center gap-4">
							<div className="size-12 rounded-lg bg-primary/20" />
							<div className="flex-1 space-y-2">
								<div className="h-4 w-32 rounded bg-primary/20" />
								<div className="h-3 w-48 rounded bg-primary/10" />
							</div>
						</div>
						<div className="grid grid-cols-3 gap-4">
							{[1, 2, 3].map((i) => (
								<div
									key={i}
									className="space-y-2 rounded-lg bg-background/50 p-4"
								>
									<div className="h-3 w-16 rounded bg-primary/20" />
									<div className="h-6 w-24 rounded bg-primary/30" />
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="-bottom-6 -right-6 absolute size-32 rounded-full bg-primary/10 blur-3xl" />
			<div className="-top-6 -left-6 absolute size-32 rounded-full bg-primary/5 blur-3xl" />
		</div>
	);
}

function DefaultVisual() {
	return (
		<div className="max-w-lg space-y-8 text-center">
			<div className="space-y-4">
				<div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-primary/10">
					<svg
						className="size-10 text-primary"
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
				<h2 className="font-bold text-2xl">
					Field Service Management, Simplified
				</h2>
				<p className="text-lg text-muted-foreground">
					Everything you need to run your field service business in one place
				</p>
			</div>
			<div className="grid gap-4 text-left">
				{[
					"Smart scheduling & dispatch",
					"Customer management",
					"Invoicing & payments",
					"Mobile app for technicians",
				].map((feature, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
							<svg
								className="size-4 text-primary"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<title>Icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						</div>
						<span className="text-sm">{feature}</span>
					</div>
				))}
			</div>
		</div>
	);
}
