import { Suspense } from "react";
import { AuthLayout } from "@/components/dashboard/AuthLayout";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Suspense fallback={<DashboardLayoutSkeleton />}>
			<AuthLayout>{children}</AuthLayout>
		</Suspense>
	);
}

function DashboardLayoutSkeleton() {
	return (
		<div className="flex h-screen">
			<SidebarSkeleton />
			<main className="flex-1 overflow-auto bg-gray-50">
				{/* Optional: page content skeleton */}
				<div className="animate-pulse p-8">
					<div className="mb-3 h-9 w-64 rounded bg-gray-200"></div>
					<div className="h-5 w-96 rounded bg-gray-200"></div>
				</div>
			</main>
		</div>
	);
}

function SidebarSkeleton() {
	return (
		<aside className="flex w-64 flex-col bg-gray-900 text-white">
			{/* Logo skeleton */}
			<div className="border-gray-800 border-b p-4">
				<div className="h-6 w-32 animate-pulse rounded bg-gray-700"></div>
			</div>

			{/* Navigation skeleton */}
			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{[1, 2, 3, 4].map((i) => (
						<li key={i}>
							<div className="flex items-center gap-3 px-4 py-3">
								<div className="h-5 w-5 animate-pulse rounded bg-gray-700"></div>
								<div className="h-4 w-24 animate-pulse rounded bg-gray-700"></div>
							</div>
						</li>
					))}
				</ul>
			</nav>

			{/* User profile skeleton */}
			<div className="border-gray-800 border-t p-4">
				<div className="mb-3 flex items-center gap-3">
					<div className="h-10 w-10 animate-pulse rounded-full bg-gray-700"></div>
					<div className="flex-1">
						<div className="mb-2 h-4 animate-pulse rounded bg-gray-700"></div>
						<div className="h-3 w-32 animate-pulse rounded bg-gray-700"></div>
					</div>
				</div>
				<div className="h-9 animate-pulse rounded bg-gray-700"></div>
			</div>
		</aside>
	);
}
