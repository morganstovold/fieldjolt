import { Zap } from "lucide-react";

export default async function Page() {
	return (
		<div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
			<div className="text-center">
				<div className="mb-8 flex items-center justify-center space-x-3">
					<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500">
						<Zap className="h-8 w-8 text-white" />
					</div>
					<h1 className="font-bold text-5xl text-white">FieldJolt</h1>
				</div>

				<p className="font-light text-2xl text-blue-200">Coming Soon</p>
			</div>
		</div>
	);
}
