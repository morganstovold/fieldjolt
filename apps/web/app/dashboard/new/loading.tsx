import { Spinner } from "@workspace/ui/components/spinner";

export default function NewOrganizationLoading() {
	return (
		<div className="flex h-screen items-center justify-center">
			<div className="space-y-4 text-center">
				<Spinner className="mx-auto" />
			</div>
		</div>
	);
}
