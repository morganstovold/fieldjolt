import { Spinner } from "@workspace/ui/components/spinner";
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
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
