import { getSession } from "@workspace/auth";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "./AppSidebar";

export async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();
	const cookieStore = await cookies();
	const defaultOpen =
		(cookieStore.get("sidebar_state")?.value ?? "true") === "true";

	if (!session) {
		redirect("/auth");
	}

	// if (!session.user.onboardingCompleted) {
	// 	redirect("/welcome");
	// }

	return (
		<SidebarProvider defaultOpen={defaultOpen}>
			<AppSidebar session={session} />
			{children}
		</SidebarProvider>
	);
}
