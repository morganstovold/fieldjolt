import { SidebarInset } from "@workspace/ui/components/sidebar";
import { Spinner } from "@workspace/ui/components/spinner";

export default function PageLoadingSkeleton() {
	return (
		<SidebarInset>
			<div className="flex h-full items-center justify-center">
				<Spinner className="mx-auto" />
			</div>
		</SidebarInset>
	);
}
